---
id: zkEVM-basics
title: What is Polygon zkEVM
sidebar_label: What is Polygon zkEVM
description: The basic concepts behind Polygon zkEVM
keywords:
  - docs
  - zk rollups
  - polygon
  - proof
  - efficiency
  - hermez
  - zkEVM
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::info

For more information about Polygon zkEVM and its architecture, head over to the [<ins>zkEVM protocol documentation</ins>](/zkEVM/introduction.md).

:::

## Introduction
Before we dive into what a zkEVM really is, we need to understand each component of this product. A zkEVM is a combination of two powerful technologies: zero knowledge, an ingenious cryptographic solution and an EVM, a distributed state machine that ushered in the development of applications in the blockchain space. 

### Zero Knowledge
Zero knowledge is a cryptography protocol that provides more security when creating proofs to validate a statement. The basic idea behind this is that it is possible to prove a statement without necessarily exposing the information used to reach that solution.

A consistent zero-knowledge proof needs to follow a few rules: verifiers should be convinced of a proven statement if that is valid. In the same way, verifiers should not be convinced by false statements, unless for a small probability. And also, the proof needs to be validated without disclosing the secret, any additional information or the statement itself.

In the blockchain field, the zero knowledge concept has been used to increase privacy in transactions, protect credentials, IDs and improve authentication, among other applications. Off-chain scalability solutions also use zero knowledge to submit proof of the validity of the transactions to Layer 1. In that way, transactions are performed faster and with more security.

### Ethereum Virtual Machine

The Ethereum Virtual Machine is the system employed by the Ethereum network to enable the running of smart contracts and dapps on the blockchain. In the beginning, this distributed network of computers, the blockchain, was more limited in the sense that it only offered the basic function of storing transactions in a decentralized manner.

The Ethereum network uses this virtual machine so that the code made on Solidity might be compiled into bytecode and then this more low-level instance could generate a state change. In fact, the whole idea of the EVM is to function as a state machine, which receives inputs that makes changes to the network's current state, eliciting the blockchain operation.

### zkEVM

The zkEVM conjoins the zero-knowledge cryptography speed and security boost with the Ethereum Virtual Machine standardization of coding and software development. As it is well known that Ethereum has some major drawbacks, such as its difficult scalability and transaction costs, a few solutions might leverage this service to deliver superior network outcomes. Such is the case of rollups.

### Rollups

Rollups serve as a cutting-edge solution for speeding up transactions in the blockchain field. They are the means used to outsource computation from the network to an off-chain environment. After the computation is done, the transaction data is sent back to Layer 1.

ZK-Rollups represent a specific type of rollup that leverages zero-knowledge cryptography to ameliorate this off-chain process. With ZK-Rollups, all the transaction data do not need to go to Ethereum; instead, only the validity proof is sent to Layer 1, which decreases costs and time to process transactions.  

## Why build a zkEVM?

### Secure Scalability
Transactions performed by smart contracts on L2 can be reliably verified on L1 without nodes having to re-execute the operations.

### Cheaper Costs
ZK-Rollups can afford to post minimal data to Ethereum because validity proofs already guarantee the trustworthiness of state transitions. ZK-Rollups can make it cheaper to use dApps, such as decentralized exchanges, NFT marketplaces, prediction markets and more.

### Faster Finality and Capital Efficiency
With ZK-rollups, transactions executed in the zkEVM are often finalized immediately after they are posted on Ethereum. Faster finality is great for power users, such as NFT traders, DeFi investors, or arbitrage traders who need to move around assets seamlessly (especially between L1 and L2).

### Network Effects
The most important reason for building EVM-compatible zkEVMs is to leverage Ethereum’s network effects. As the world’s biggest smart contracts platform, Ethereum has a large ecosystem that provides value to both developers and projects.

# Polygon zkEVM

**Polygon zkEVM** is a source-available ZK-Rollup providing EVM opcode compatibility for a frictionles user experience and the security of Ethereum.

It is the first zero-knowledge scaling solution that is fully equivalent to an EVM. All existing smart contracts, developer toolings and wallets work seamlessly. The zkEVM harnesses the power of ZK proofs to reduce transaction cost and massively increase throughput, all while inheriting the security of Ethereum.

## Benefits of Polygon zkEVM

- Ethereum-equivalence
- Ethereum security
- ZKP-powered scalability

**Polygon zkEVM** is a Layer 2 scaling solution for Ethereum that leverages the scaling power of zero-knowledge proofs while maintaining Ethereum compatibility. Developers and users on **Polygon zkEVM** can use the same code, tooling, apps, etc that they use on Ethereum, but with much higher throughput and lower fees.

Developers will deploy their existing contracts to the zkEVM, and users can deposit assets from Ethereum and transact off-chain. These transactions are grouped into batches with zero-knowledge proof attesting to the validity of each transaction. This ensures that the operators of the zkEVM can’t steal user funds, so we can say that it inherits the security of Ethereum.

**Polygon zkEVM** offers compatibility and scalability without compromise.

## Unique Value Propositions of Polygon zkEVM

**EVM-equivalent:** The best way to scale Ethereum is to keep compatibility with the whole ecosystem, and the zkEVM will give users and developers an identical experience to Ethereum L1 with an added massive scalability improvement.

**Performance:** With the cryptographic breakthroughs pioneered by Polygon Zero and Miden, we can achieve full EVM compatibility while offering better performance (higher throughput, lower latency, and lower cost) than alt-L1s, optimistic rollups and other ZK-Rollups.

## How does Polygon zkEVM compare to other solutions?

### Compatibility

The Ethereum developer ecosystem is the result of a huge investment of time and energy, and preserving compatibility with the ecosystem is a major selling point for the zkEVM. We're not just scaling transactions per second on Ethereum, we're also building on the foundation of a vibrant community and ecosystem.

### Performance

**Polygon zkEVM** Prover is able to validate 500K gas units on a single CPU server (64 cores) in about 5 minutes time.

Polygon zkEVM is the first to implement recursive STARKs. We've witnessed a massive ~100x improvements in the most expensive operations in the zkEVM: Keccak, ECDSA, and Recursion, over the previous state of the art. By enabling recursion, zkEVM has a clear path to improve ZK proof times and scalability.

### Security & Ethereum-alignment

Using ZK allows a ZK L2 to inherit the security of Ethereum. ZK proofs ensure that every transaction on the zkEVM is valid. This ensures that it's impossible for operators of the L2 to steal funds from users.

Security (as well as scalability) is a major benefit for the zkEVM when compared to alt-L1s, and it ensures that the zkEVM is closely aligned with Ethereum, still by far the dominant chain in terms of developer activity, TVL, NFT activity, etc.
 
## Use cases for Polygon zkEVM

### DeFi Applications

Because of **Polygon zkEVM**’s high security and its censorship resistance nature, it is a good fit for DeFi applications. Unlike Optimistic Roll-ups where users have to wait for up to 7 days for deposits and withdrawals, ZK-rollups don’t have to wait for long periods in order to deposit / withdraw.

### NFT, GameFi, and Enterprise Applications

Low gas cost, high TPS, and greater security level coupled with Ethereum composability will surely attract blue chip NFTs, GameFi, and Enterprise applications to build on top of zkEVM.

### Payments

Users interested in transacting with each other in real-time with a near-instantaneous and low-fee environment will appreciate the value **Polygon zkEVM** provides.

## Further Reading

- [Polygon ZK Rollups: Everything You Need to Know](https://www.alchemy.com/overviews/polygon-zk-rollups)
- [Guide to Using the Polygon zkEVM](https://polygon.technology/blog/your-three-step-guide-to-using-polygon-zkevm-yes-its-that-easy)
- [Technical Overview of Polygon zkEVM and zkEVM Rollup](https://mirror.xyz/msfew.eth/JJudP_Kf-IS6VhbF-qU0BUor1Ap6SFEb0TzYOHZ34Rc)
