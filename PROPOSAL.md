# Product Proposal

## What is the product, and who uses it?

**MidnightPass** is a privacy-preserving age and eligibility gate. Web3 decentralized applications (e.g., DeFi protocols, gaming sites, token launchpads) and Web2 platforms requiring age verification can use it to verify that users are of legal age (18+) without forcing them to reveal their exact date of birth or age. 

Users who value their online privacy use MidnightPass to access age-restricted services. Instead of sharing copies of government IDs or exact birthdates, they submit a cryptographic proof that confirms they meet the age requirement while keeping their personal data completely private.

## Why Midnight specifically?

On traditional transparent blockchains (like Ethereum or Cardano), any verification transaction would publish either the date of birth or the exact age on a public ledger, exposing the user to identity theft and tracking. 

Midnight's hybrid privacy model is uniquely suited for this product:
1. **Local ZK Proofs:** The zero-knowledge proof is generated locally in the user's browser, meaning their sensitive date of birth never leaves their device.
2. **Ledger Map State:** The smart contract maintains a public ledger map of eligible public keys. Once the proof is generated and verified, only the user's public key is mapped to `true` on-chain.
3. **Decoupled Verification:** DApps can query the on-chain map to check if a connected wallet address has a valid registration, verifying eligibility instantly without ever knowing the user's personal details.

## Data Model

| Data Point | Type | Disclosed To | Description |
|------------|------|--------------|-------------|
| Date of Birth (Year, Month, Day) | Private witness | No one | Used locally to calculate age; never sent over the network or written to the ledger. |
| Exact Age | Private witness | No one | Computed inside the ZK circuit; never disclosed. |
| User Public Key | Public ledger key | Everyone | Registered on the public ledger map to identify who is verified. |
| Eligibility Result (true) | Public ledger value | Everyone | A boolean indicating successful verification. |
| Current Date Inputs | Public parameters | Everyone | Public inputs representing the day the proof was generated to ensure correct calculations. |

## Mainnet Feasibility

Yes, reaching Mainnet by Level 6 is highly feasible. 
- **Storage Efficiency:** The on-chain footprint is minimal, requiring only a mapping of verified public keys to boolean values.
- **Production Extension:** To move from a self-attested prototype to a production-ready application, we will integrate a trusted third-party credential issuer (like a DID provider). The issuer will sign the user's date of birth. The Midnight smart contract circuit will then verify both the age calculation (DOB vs. current date) and the issuer's cryptographic signature within the ZK proof, achieving trustless, decentralized verification without disclosing user identity.
