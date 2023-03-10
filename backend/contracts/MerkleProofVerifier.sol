// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleProofVerifier {
  bytes32 public root;

  constructor() {}

  function verify(
      bytes32[] memory proof,
      string memory hashPrivKey
  ) public returns (bool response){
      bytes32 leaf = keccak256(abi.encode(hashPrivKey));
      response = MerkleProof.verify(proof, root, leaf);
  }

  function setRoot(bytes32 _root) public {
    root = _root;
  }
}