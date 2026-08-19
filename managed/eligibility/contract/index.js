import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.16.0');

const _descriptor_0 = new __compactRuntime.CompactTypeUnsignedInteger(4294967295n, 4);
const _descriptor_1 = __compactRuntime.CompactTypeBoolean;
const _descriptor_2 = new __compactRuntime.CompactTypeBytes(32);

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      prove_eligibility: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`prove_eligibility: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const current_year_0 = args_1[1];
        const current_month_0 = args_1[2];
        const current_day_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('prove_eligibility',
                                     'argument 1 (as invoked from Typescript)',
                                     'eligibility.compact line 17 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(current_year_0) === 'bigint' && current_year_0 >= 0n && current_year_0 <= 4294967295n)) {
          __compactRuntime.typeError('prove_eligibility',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'eligibility.compact line 17 char 1',
                                     'Uint<32>',
                                     current_year_0)
        }
        if (!(typeof(current_month_0) === 'bigint' && current_month_0 >= 0n && current_month_0 <= 4294967295n)) {
          __compactRuntime.typeError('prove_eligibility',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'eligibility.compact line 17 char 1',
                                     'Uint<32>',
                                     current_month_0)
        }
        if (!(typeof(current_day_0) === 'bigint' && current_day_0 >= 0n && current_day_0 <= 4294967295n)) {
          __compactRuntime.typeError('prove_eligibility',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'eligibility.compact line 17 char 1',
                                     'Uint<32>',
                                     current_day_0)
        }
        // Call witnesses (private inputs)
        const [witnessState_0, dob_year_0] = this.witnesses.secret_dob_year(contextOrig_0.witnessContext);
        const [witnessState_1, dob_month_0] = this.witnesses.secret_dob_month({...contextOrig_0.witnessContext, privateState: witnessState_0});
        const [witnessState_2, dob_day_0] = this.witnesses.secret_dob_day({...contextOrig_0.witnessContext, privateState: witnessState_1});
        const [witnessState_3, user_pk_0] = this.witnesses.user_public_key({...contextOrig_0.witnessContext, privateState: witnessState_2});

        // Compute eligibility
        const year_diff = current_year_0 - dob_year_0;
        const is_older = year_diff > 18n;
        const is_exact = year_diff === 18n;
        const month_ok = current_month_0 > dob_month_0;
        const month_equal = current_month_0 === dob_month_0;
        const day_ok = current_day_0 >= dob_day_0;
        const is_eligible = is_older || (is_exact && (month_ok || (month_equal && day_ok)));

        if (!is_eligible) {
          throw new __compactRuntime.CompactError('User is not 18 years or older');
        }

        // Update ledger state
        const newState = contextOrig_0.currentQueryContext.clone();
        newState.setField('eligibility', user_pk_0, true);

        return { result: true, newPrivateState: witnessState_3, newQueryContext: newState };
      }
    };
    this.impureCircuits = this.circuits;
    this.provableCircuits = this.circuits;
  }

  initialState(context) {
    const newState = context.startState.clone();
    newState.initMap('eligibility');
    return { newState, newPrivateState: context.privateState };
  }
}

export function ledger(state) {
  return {
    eligibility: state.getMap('eligibility')
  };
}

export const pureCircuits = {};
export const contractReferenceLocations = {};
