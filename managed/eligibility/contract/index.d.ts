import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
  secret_dob_year(context: __compactRuntime.WitnessContext<PS>): [PS, bigint];
  secret_dob_month(context: __compactRuntime.WitnessContext<PS>): [PS, bigint];
  secret_dob_day(context: __compactRuntime.WitnessContext<PS>): [PS, bigint];
  user_public_key(context: __compactRuntime.WitnessContext<PS>): [PS, Uint8Array];
}

export type ImpureCircuits<PS> = {
  prove_eligibility(context: __compactRuntime.CircuitContext<PS>,
                    current_year_0: bigint,
                    current_month_0: bigint,
                    current_day_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
}

export type ProvableCircuits<PS> = {
  prove_eligibility(context: __compactRuntime.CircuitContext<PS>,
                    current_year_0: bigint,
                    current_month_0: bigint,
                    current_day_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  prove_eligibility(context: __compactRuntime.CircuitContext<PS>,
                    current_year_0: bigint,
                    current_month_0: bigint,
                    current_day_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
}

export type Ledger = {
  readonly eligibility: __compactRuntime.StateMapHelper<Uint8Array, boolean>;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
