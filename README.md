# Zicket - the anon buyer's ticket

## About

Zicket is a solution to the scalping problem raised by Vitalik Buterin at ETH Mexico. Currently, people can buy multiple conference tickets at once, which is a problem because it encourages ticket misuse and allows bots to resell tickets at inflated prices. Our solution uses zk proofs to allow buyers to remain anonymous, while also limiting ticket orders to one per person and making the tickets non-transferable. Our goal is to prevent ticket scalping and protect buyers' privacy.

## Problem Statement

The problem we're addressing is the tension between buyers who want to remain anonymous when purchasing event tickets and organizers who need to ensure that the person using the ticket is the original buyer. Current solutions that can be integrated into ticket-selling platforms without compromising privacy are limited, which is why we created Zicket to tackle multiple issues at once.

## Solution

Zicket is a plugin that can be integrated into any ticket-selling platform. It enables buyers to remain anonymous by using zk proofs generated using PolygonID. To prevent the purchase of more than one ticket, Zicket checks if the public key is in the set of nullifiers. Tickets are then sent to the buyer's wallet and made non-transferable, preventing reselling and protecting buyers from inflated prices.

## How we used Polygon

We used the Polygon Flutter SDK to create an Identity Wallet that stores the Proof of Humanity claim and the Proof of ticket purchase, which is not in the set of nullifiers. By using Polygon, we ensure that Zicket is efficient, scalable and provides an easy and simple buyer flow from registration to the ticket claim.

## :tada: Demo :tada:

## Tech Architecture 

:eyes: How to solve this?

Polygon ID

:tada: Demo

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
- Zicket ID wallet will be built on top of Polygon Flutter SDK
- Users will use Zicket ID wallet and have all claims in one place
- The flow will only require scanning one QR code and payment


