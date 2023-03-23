// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./interfaces/IEventTicket.sol";

contract EventTicket is IEventTicket, ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private ticketIds;
  
  constructor() ERC721("Zicket event ticket", "ZKT") {}

  function awardTicket(string memory tokenURI, address ticketDestinationAddress) public override returns(uint256 ticketId) {
    ticketIds.increment();
    uint256 newTicketId = ticketIds.current();
    _safeMint(ticketDestinationAddress, newTicketId);
    _setTokenURI(newTicketId, tokenURI);

    ticketId = newTicketId;
  }

    function burn(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Only owner of token can burn it.");
        _burn(tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256, uint256) pure override internal {
        require(from == address(0) || to == address(0), "This is not transferable token");
    }

  function _burn(uint256 ticketId) internal override {
    super._burn(ticketId);
  }
}