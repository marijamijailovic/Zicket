// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract SBTTicket is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private ticketIds;
  string ticketURI;
  mapping(address => string) userTicket;
  mapping(address => bool) issuedTicket;

  event TicketIssued(address indexed issuer, address indexed receiver, string ipfsCid);
  event Issued(address indexed issuer, address indexed to, uint256 indexed tokenID);

  //Each event need to create its own SBT token, that represent ticket
  constructor(string memory _name, string memory _token, string memory _ticketURI) ERC721(_name, _token) {
    ticketURI = _ticketURI;
  }

  //After the payment is success the event owner call function to mint ticket for the user
  //We require that the user is not issued the ticket
  //We set the tokenURI for the user
  function claimTicket(string memory tokenURI, address to) public returns(uint256) {
    require(!issuedTicket[to], "Ticket is issued");

    ticketIds.increment();

    uint256 newId = ticketIds.current();
    _mint(to, newId);
    _setTokenURI(newId, tokenURI);

    userTicket[to] = tokenURI;
    issuedTicket[to] = true;

    return newId;
  }
}