import { describe, it, expect, beforeEach } from 'vitest';
import { EligibilityContract } from '../src/contract.ts';

describe('MidnightPass Age / Eligibility Gate Smart Contract Unit Tests', () => {
  let contract: EligibilityContract;

  beforeEach(() => {
    contract = new EligibilityContract();
  });

  // ────────────────────────────────────────────────────────────
  // TEST 1: Circuit Logic — Eligible user (>= 18 years old)
  // ────────────────────────────────────────────────────────────
  it('(1) Circuit logic — eligible user (DOB: 2004-07-15, age 22) should succeed', () => {
    const result = contract.prove_eligibility(
      2026, 8, 19,  // current date
      2004, 7, 15,  // dob (22 years old)
      '0xabc123'
    );
    expect(result.success).toBe(true);
  });

  // ────────────────────────────────────────────────────────────
  // TEST 2: Under-18 rejection
  // ────────────────────────────────────────────────────────────
  it('(2) Circuit logic — under-18 user (DOB: 2012-10-10, age 13) should throw', () => {
    expect(() => {
      contract.prove_eligibility(
        2026, 8, 19,
        2012, 10, 10,
        '0xabc123'
      );
    }).toThrow('User is not 18 years or older');
  });

  // ────────────────────────────────────────────────────────────
  // TEST 3: State transition — Ledger state updates correctly
  // ────────────────────────────────────────────────────────────
  it('(3) State transition — eligibility ledger map updates correctly after verification', () => {
    const userPk = '0xdeadbeef0000000000000000000000000000000000000000000000000000001a';
    const formattedPk = 'deadbeef0000000000000000000000000000000000000000000000000000001a';

    // Before: no eligibility for user
    expect(contract.state.eligibility[formattedPk]).toBeUndefined();

    // Run proof
    contract.prove_eligibility(
      2026, 8, 19,
      1990, 3, 22,  // dob (36 years old, eligible)
      userPk
    );

    // After: eligibility set to true in ledger state
    expect(contract.state.eligibility[formattedPk]).toBe(true);

    // Verify state has ONLY the eligibility map — no other raw fields
    expect(Object.keys(contract.state)).toEqual(['eligibility']);
  });

  // ────────────────────────────────────────────────────────────
  // TEST 4: Zero-Knowledge Privacy Isolation
  // ────────────────────────────────────────────────────────────
  it('(4) Privacy isolation — private DOB is NEVER present in public ledger state', () => {
    const dobYear = 1992;
    const dobMonth = 11;
    const dobDay = 25;
    // Use a DOB string that is highly distinguishable and would never appear by coincidence
    const dobString = `${dobYear}-${dobMonth}-${dobDay}`;

    const userPk = '0x00ff00ff00000000000000000000000000000000000000000000000000000099';

    contract.prove_eligibility(
      2026, 8, 19,
      dobYear, dobMonth, dobDay,
      userPk
    );

    // Serialize the public ledger state (what an observer would see)
    const publicLedger = JSON.stringify(contract.state, (_k, v) =>
      typeof v === 'bigint' ? v.toString() : v
    );

    // The private DOB as a composite string must NEVER appear in the public state
    expect(publicLedger).not.toContain(dobString);

    // The private year also must not appear (it's 1992 — well distinct from current year 2026)
    expect(publicLedger).not.toContain(String(dobYear));

    // The ledger must contain the public key -> true mapping
    const formattedPk = '00ff00ff00000000000000000000000000000000000000000000000000000099';
    expect(contract.state.eligibility[formattedPk]).toBe(true);
  });
});
