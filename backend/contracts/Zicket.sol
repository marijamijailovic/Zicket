// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./SBTTicket.sol";

contract Zicket is Ownable {
    address payable public eventOwner;
    SBTTicket public sbt;

    constructor() payable {
        eventOwner = payable(msg.sender);
    }

    function createEvent(string memory _name, string memory _token, string memory _ticketURI) public onlyOwner {
        sbt = new SBTTicket(_name, _token, _ticketURI);
    }

    function deposit() public payable {}

    function withdraw() public {
        uint amount = address(this).balance;
        (bool success, ) = eventOwner.call{value: amount}("");
        require(success, "Failed to send Ether");
    }

    function sendTicket(string memory tokenURI, address to) public onlyOwner returns (uint256) {
      uint256 ticketId = sbt.claimTicket(tokenURI, to);
      return ticketId;
    }
}
