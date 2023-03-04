import { ethers } from "hardhat";

const Operators = {
  NOOP : 0, // No operation, skip query verification in circuit
  EQ : 1, // equal
  LT : 2, // less than
  GT : 3, // greater than
  IN : 4, // in
  NIN : 5, // not in
  NE : 6   // not equal
}

async function main() {

  // you can run https://go.dev/play/p/rnrRbxXTRY6 to get schema hash and claimPathKey using ProogOfHumanity schema
  const schemaBigInt = ""

   // merklized path to field in the W3C credential according to JSONLD  schema e.g. isHuman in the ProogOfHumanity"
  const schemaClaimPathKey = ""

  const requestId = 1;

  const query = {
    schema: schemaBigInt,
    claimPathKey  : schemaClaimPathKey,
    operator: Operators.EQ, // operator
    value: [1, ...new Array(63).fill(0).map(i => 0)], // for operators 1-3 only first value matters
  };

  // add the address of the contract just deployed
  const CredentialVerifierAddress = "0x41AA5f08620f26fF6b83361aCf198b2C8c18b653";//"0x1C30DC7674e5Fd4f6154152E018b92ff29E66B41"

  let credentialVerifier = await ethers.getContractAt("CredentialVerifier", CredentialVerifierAddress);

  const validatorAddress = "0xF2D4Eeb4d455fb673104902282Ce68B9ce4Ac450"; // sig validator
  // const validatorAddress = "0x3DcAe4c8d94359D31e4C89D7F2b944859408C618"; // mtp validator

  try {
    await credentialVerifier.setZKPRequest(
        requestId,
        validatorAddress,
        query.schema,
        query.claimPathKey,
        query.operator,
        query.value
    );
    console.log("Request set");
  } catch (e) {
    console.log("error: ", e);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
