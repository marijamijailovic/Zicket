export const qrProofOfPurchasingTicket = {
  id: "c811849d-6bfb-4d85-936e-3d9759c7f105",
  typ: "application/iden3comm-plain-json",
  type: "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
  body: {
    transaction_data: {
      contract_address: "0x8ef117ebc10B6649aB3f9F2Db8b1d9EFC8be5E5B", //my contract address
      method_id: "b68967e2",
      chain_id: 80001,
      network: "polygon-mumbai"
    },
    reason: "airdrop participation",
    scope: [
      {
        id: 1,
        circuit_id: "credentialAtomicQuerySig",
        rules: {
          query: {
            allowed_issuers: ["*"],
            req: {
              numberAttribute: {
                $eq: 27
              }
            },
            schema: {
              url: "https://s3.eu-west-1.amazonaws.com/polygonid-schemas/46e21b97-e3a2-49b2-908f-19abfc21b530.json-ld",//"https://schema.polygonid.com/jsonld/dao.json-ld", // Updated schema url
              type: "TestSchema"//"ProofOfPersonhood"
            }
          }
        }
      }
    ]
  }
}