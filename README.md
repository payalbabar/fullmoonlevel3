# MidnightPass

![CI](https://github.com/payalbabar/fullmoonlevel3/actions/workflows/ci.yml/badge.svg)

> Prove you're eligible without revealing your exact age.

---

## Live Demo

[Live URL](https://midnight-pass.vercel.app/)

## Contract Address

| Network | Address |
|---------|---------|
| Preprod | `0x020065244a0bccd39d8e9957b8db38240d72ba33ff43531e5543b898398c` |

---

## What This Does

**MidnightPass** is an Age / Eligibility Gate dApp built on the Midnight Network. A user proves they satisfy an age requirement (18+) while minimizing disclosure of their underlying private date-of-birth data.

The user enters their date of birth privately into a browser form. A Compact smart-contract circuit verifies the calendar age condition (`current_date - dob >= 18 years`) inside a zero-knowledge proof, and only the boolean eligibility result is written to the public ledger — **never the age or date of birth itself**.

---

## Privacy Model

### PUBLIC
- Eligibility verification result (`true` / `false`)
- User's public key (ledger map key)
- Current date inputs (year / month / day passed to the public circuit)

### PRIVATE
- Exact age
- Date of birth (year, month, day)
- Private witness / input data

### PROVED WITHOUT REVEALING
- Whether the user satisfies the required age threshold (18+)

---

## Privacy Claim

An on-chain observer can see:
- **That a verification transaction happened** (transaction on-chain)
- **Which public key became eligible** (the ledger map key)
- **The eligibility result** (`true` / not present)

An on-chain observer **cannot** see:
- The user's date of birth
- The user's exact age
- Any other witness inputs

> **Prototype Limitation:** In this prototype, the user manually enters their date of birth into the browser form. This makes it a *self-attested* age, not a cryptographically authenticated real-world credential. A production implementation would require a trusted credential issuer (e.g., a government ID verifier, or a DID/VC provider) to sign the DOB before it is used as a private witness input. The ZK proof then proves the age computation correctly, but the *authenticity* of the DOB depends on the issuer.

---

## Tech Stack

- **Smart Contract Language:** Compact (Midnight Network) v0.23 — compiled with `compactc` v0.31.1
- **Frontend Framework:** Vite + React 18 + TypeScript
- **Wallet Integration:** Midnight DApp Connector API (`@midnight-ntwrk/dapp-connector-api`)
- **Testing:** Vitest
- **CI/CD:** GitHub Actions

---

## Prerequisites

- **Node.js** v22+
- **WSL** (Ubuntu) with `compactc` installed at `/home/<user>/.compact/versions/0.31.1/`
- **Lace Wallet** (or 1AM Wallet) browser extension connected to Midnight Preprod

---

## Setup & Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/payalbabar/fullmoonlevel3.git
cd midnightpass-eligibility-gate

# 2. Install dependencies
npm install

# 3. Compile the Compact contract (requires WSL + compactc)
npm run compact-compile

# 4. Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Run Tests

```bash
npm test
```

---

## Build

```bash
npm run build
```

---

## CI/CD

The `.github/workflows/ci.yml` pipeline:
1. Checks out the repository
2. Installs Node.js 22
3. Installs npm dependencies
4. Compiles the Compact contract (if `compactc` is available; skips gracefully if not)
5. Runs the full Vitest test suite
6. Builds the production bundle

The workflow fails if tests or the build fail.

---

## Product Proposal

See [`PROPOSAL.md`](./PROPOSAL.md).
