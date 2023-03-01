import { ethers } from "hardhat";

async function main() {
  const verifierContract = "CredentialVerifier";

  const spongePoseidonLib = "0x12d8C87A61dAa6DD31d8196187cFa37d1C647153";
  const poseidon6Lib = "0xb588b8f07012Dc958aa90EFc7d3CF943057F17d7";


  const CredentialVerifier = await ethers.getContractFactory(verifierContract,{
    libraries: {
      SpongePoseidon: spongePoseidonLib,
      PoseidonUnit6L: poseidon6Lib
    },
  } );
  const credentialVerifier = await CredentialVerifier.deploy();

  await credentialVerifier.deployed();
  console.log("Credential verifiable contract address:", credentialVerifier.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
