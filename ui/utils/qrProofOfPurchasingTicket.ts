export const qrProofOfPurchasingTicket = {
  "id": "7f38a193-0918-4a48-9fac-36adfdb8b542",
  "typ": "application/iden3comm-plain-json",
  "type": "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
  "thid": "7f38a193-0918-4a48-9fac-36adfdb8b542",
  "body": {
      "reason": "airdrop participation",
      "transaction_data": {
          "contract_address": "0x41AA5f08620f26fF6b83361aCf198b2C8c18b653",
          "method_id": "b68967e2",
          "chain_id": 80001,
          "network": "polygon-mumbai"
      },
      "scope": [
          {
              "id": 1,
              "circuitId": "credentialAtomicQuerySigV2OnChain",
              "query": {
                  "allowedIssuers": [
                      "*"
                  ],
                  "context": "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld",
                  "credentialSubject": {
                      "birthday": {
                          "$eq": 19950703
                      }
                  },
                  "type": "KYCAgeCredential"
              }
          }
      ]
  }
}