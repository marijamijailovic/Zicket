// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface IZicket {
    struct UserData {
      string did;
      string hashedPrivKey;
    }

    struct Event {
				address payable eventOwner;
				uint256 ticketPrice;
        uint256 totalAmountReceived;
        uint256 eventStart;
        uint256 eventEnd;
				string name;
				string description;
				string ticketTokenURI;
		}

		event EventCreation(address indexed _sender, uint256 indexed _eventId, Event indexed _event);
    event Verified(address indexed sender, string indexed did);
    event TicketSBT(uint256 indexed _ticketId, address indexed _ticketDestinationAddress);

    /**
		* @notice Create a new event, allowed to the contract owner.
		* @param eventOwner The address of the new event.
    * @param ticketPrie The price of ticket for the event, in wei.
    * @param totalAmountReceived The total amount this event have from selling tickets.
		* @param eventStart The start time of new event.
		* @param eventEnd The end time of new event.
		* @param name The name of the new event.
		* @param descripton Brief description of the new event.
		* @param ticketTokenURI NFT token to send user on success purchase
		*/
		function addNewEvent(address payable eventOwner, uint256 ticketPrie, uint256 totalAmountReceived, uint256 eventStart, uint256 eventEnd, string memory name, string memory descripton, string memory ticketTokenURI) external;

    /**
		* @notice Verify that user is eligable for the given event id.
		* @param eventId The id of the event for ticket purchase.
    * @param userData The user did and hashed private key.
		*/
		function userVerification(uint256 eventId, UserData memory userData, uint64 requestId, uint256[] calldata inputs, uint256[2] calldata a, uint256[2][2] calldata b, uint256[2] calldata c) external;

		/**
		* @notice Place payment in matic for the given event id.
		* @param eventId The id of the event for ticket purchase.
    * @param ticketDestinationAddress The destination address of ticket.
		*/
		function purchaseTicket(uint256 eventId, address ticketDestinationAddress) external payable;
}