# Zicket - the anon buyer's ticket

## About

Zicket is a solution to the scalping problem raised by Vitalik Buterin at ETH Mexico 2022 (https://www.youtube.com/watch?v=rp3cDq2LiBM). Currently, people can buy multiple conference tickets at once, which is a problem because it encourages ticket misuse and allows bots to resell tickets at inflated prices. Our solution uses zk proofs to allow buyers to remain anonymous, while also limiting ticket orders to one per person and making the tickets non-transferable. Our goal is to prevent ticket scalping and protect buyers' privacy.

## Problem Statement

The problem we're addressing is the tension between buyers who want to remain anonymous when purchasing event tickets and organizers who need to ensure that the person using the ticket is the original buyer. Current solutions that can be integrated into ticket-selling platforms without compromising privacy are limited, which is why we created Zicket to tackle multiple issues at once.

## Solution

Zicket is a plugin that can be integrated into any ticket-selling platform. It enables buyers to remain anonymous by using zk proofs generated using PolygonID. To prevent the purchase of more than one ticket, Zicket checks if the public key is in the set of nullifiers. Tickets are then sent to the buyer's wallet and made non-transferable, preventing reselling and protecting buyers from inflated prices.

A good example of reselling gone wrong is group of people managed to trick the system for EthCC, purchasing 200 tickets with a plan to resell them. But when the conference organisers stripped the NFTs of their metadata, the resellers realised that the plan had fallen apart. They spent about $68k for 200 tickets that were useless (https://rekt.news/ethcc-detychey-vs-touts/). This would, of course, be imposible with Zicket. **Dopuniti**

## How we used Polygon

We used the Polygon Flutter SDK to create an Identity Wallet that stores the Proof of Humanity claim and the Proof of ticket purchase, which is not in the set of nullifiers. By using Polygon, we ensure that Zicket is efficient, scalable and provides an easy and simple buyer flow from registration to the ticket claim.

Link to the extended Polygon ID Wallet also known as Zicket ID Wallet: https://github.com/marija-mijailovic/zicket-polygonid-flutter-sdk.git

## :tada: Demo Video :tada:

## Tech Architecture 

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

## Tech Stack

- PolygonID
- ZK Proofs
- Circom
- Solidity
- WAGMI
- node.js

## How to run 

## What's next

The next step is creating a perfect flow for Zicket. This would mean: 

- Go from being a sample service to onboarding real companies that provide Proof of Humanity Credentials.  

- Integrate Zicket into ticketing platforms.

- Users will use Zicket ID wallet and have claims as well as ticket NFTs in their wallets.




