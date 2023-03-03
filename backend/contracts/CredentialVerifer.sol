// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./lib/GenesisUtils.sol";
import "./interfaces/ICircuitValidator.sol";
import "./verifiers/ZKPVerifier.sol";

contract CredentialVerifer is ZKPVerifier {
  uint64 public constant TRANSFER_REQUEST_ID = 1;

  mapping(uint256 => address) public idToAddress;
  mapping(address => uint256) public addressToId;
  mapping(string => string) public didToHashedPrivateKey;

  event AfterProofSubmited(address indexed user);

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
        // this is linking between msg.sender and
        require(
            msg.sender == addr,
            "address in proof is not a sender address"
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
        uint256 id = inputs[validator.getChallengeInputIndex()];
        // additional check didn't get purchase before
        if (idToAddress[id] == address(0)) {
            addressToId[msg.sender] = id;
            idToAddress[id] = msg.sender;
        }
        emit AfterProofSubmited(msg.sender);
    }

     function submitProofRequest(
        string memory did, 
        string memory hashedPrivateKey,
        uint64 requestId,
        uint256[] calldata inputs,
        uint256[2] calldata a,
        uint256[2][2] calldata b,
        uint256[2] calldata c
        ) external {
            require(
                keccak256(abi.encodePacked(didToHashedPrivateKey[did])) == keccak256(abi.encodePacked("")),
                "This did already purchase for ticket"
            );
            didToHashedPrivateKey[did] = hashedPrivateKey;
            ZKPVerifier.submitZKPResponse(requestId, inputs, a, b, c);
        }
}
