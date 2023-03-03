// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface IEventTicket {
  /**
  * @notice Mint sbt token that is event ticket
  * @param tokenURI The URI of the ticket.
  * @param ticketDestinationAddress The final address of the ticket owner.
  */
	function awardTicket(string memory tokenURI, address ticketDestinationAddress) external returns (uint256 ticketId);
}