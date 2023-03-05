// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./lib/GenesisUtils.sol";
import "./interfaces/ICircuitValidator.sol";
import "./verifiers/ZKPVerifier.sol";

contract CredentialVerifier is ZKPVerifier {
  uint64 public constant TRANSFER_REQUEST_ID = 1;

  mapping(uint256 => address) public idToAddress;
  mapping(address => uint256) public addressToId;
  mapping(string => string) public didToHashedPrivateKey;

  event AfterProofSubmited(address indexed user);
  event AlreadyPurchaseTicket(string indexed did);

  constructor() {}

  function _beforeProofSubmit(
        uint64, /* requestId */
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
        // check that  challenge input is address of sender
        address addr = GenesisUtils.int256ToAddress(
            inputs[validator.getChallengeInputIndex()]
        );
        // this is linking between msg.sender
        require(
            msg.sender != addr,
            "Address in proof is not a sender address"
        );
    }

    function _afterProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal override {
        require(
            requestId == TRANSFER_REQUEST_ID && addressToId[msg.sender] == 0,
            "Proof can not be submitted more than once"
        );

        // user address didn't verifed
        uint256 _id = inputs[validator.getChallengeInputIndex()];
        // additional check didn't get purchase before
        if (idToAddress[0] == address(0)) {
            addressToId[msg.sender] = 0;
            idToAddress[0] = msg.sender;
        }
        emit AfterProofSubmited(msg.sender);
    }

     function submitProofRequest(
        string memory did, 
        string memory hashedPrivateKey,
        uint64 requestId,
        uint256[] calldata inputs
        ) external {
            require(keccak256(abi.encodePacked(didToHashedPrivateKey[did])) == keccak256(abi.encodePacked("")), "The did already buy ticket.");
            didToHashedPrivateKey[did] = hashedPrivateKey;
            ZKPVerifier.submitZKPResponse(requestId, inputs);
        }
}
