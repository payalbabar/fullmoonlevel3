export class EligibilityContract {
  state: {
    eligibility: Record<string, boolean>;
  };

  constructor() {
    this.state = {
      eligibility: {},
    };
  }

  prove_eligibility(
    current_year: number,
    current_month: number,
    current_day: number,
    dob_year: number,
    dob_month: number,
    dob_day: number,
    user_pk: string
  ): { success: boolean } {
    const year_diff = current_year - dob_year;
    const is_older = year_diff > 18;
    const is_exact = year_diff === 18;

    const month_ok = current_month > dob_month;
    const month_equal = current_month === dob_month;
    const day_ok = current_day >= dob_day;

    const is_eligible = is_older || (is_exact && (month_ok || (month_equal && day_ok)));

    if (!is_eligible) {
      throw new Error('User is not 18 years or older');
    }

    // Strip 0x prefix for ledger key — only the public key is stored, NOT the DOB
    const formattedPk = user_pk.startsWith('0x') ? user_pk.slice(2) : user_pk;
    this.state.eligibility[formattedPk] = true;

    return { success: true };
  }
}
