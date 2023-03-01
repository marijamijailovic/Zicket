# Zicket - the anon buyer's ticket

## About

Zicket tackles a very interesting scalping problem that Vitalik Buterin, at ETH Mexico raised. The issue of people buying multiple conference tickets simultaneously. This indicates that this is an open problem and that there aren’t any solutions. Solving this issue will help prevent ticket misuse by destroying the incentive to resell tickets and making bots redundant. We wanted to one up that idea by:

- Using zk proofs
- Limiting ticket order to one per person
- Making the tickets non-transferable

Staying anonymous should be everyone’s right and pumping up ticket prices must be prevented.

## Problem Statement

People want to buy event tickets without revealing their identity or private information, while event organizers want to ensure that the person using the ticket is the original buyer.

Right now, there aren’t many solutions that can be integrated into any ticket-selling platforms, while preserving privacy. That’s why we decided to created Zicket.

## Solution

Zicket is a plugin that can be integrated into every ticket-selling platform.
It allows buyers to stay anonymous by generating zk proofs using PolygonID.
Zicket prevents buying more than one ticket by checking if the public key is in the set of nullifiers. 
Tickets are sent to the wallet and made non-transferable to prevent reselling.

## How we used Polygon

We plan on using the Polygon Flutter SDK for creating an Identity Wallet that will be used to store the Proof of Humanity claim and the Proof that you haven't already purchased a ticket (not in the set of nullifiers)

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


