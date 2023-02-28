---
id: l2-transaction-cycle-intro
title: Transaction Life Cycle in zkEVM
sidebar_label: Submit Transaction
description: A guide to help developers understand the transaction life cycle in zkEVM.
keywords:
  - docs
  - zk rollups
  - polygon
  - zkEVM
  - zkevm protocol
  - deploy on zkEVM
  - Polygon zkEVM
image: https://wiki.polygon.technology/img/thumbnail/polygon-zkevm.png
---

:::info

This document series describes in detail the various forms and stages that L2 users' transactions go through, from the time they are created in users' wallets to the time they are finally verified with indisputable evidence on L1.

:::

## Submit Transaction

Transactions in the Polygon zkEVM network are created in users' wallets and signed with their private keys.

Once generated and signed, **the transactions are sent to the Trusted Sequencer's node via their JSON-RPC interface**. The transactions are then stored in the **pending transactions pool**, where they await the Sequencer's selection for execution or discard.

**Users and the zkEVM communicate using JSON-RPC, which is fully compatible with Ethereum RPC**. This approach allows any EVM-compatible application, such as wallet software, to function and feel like actual Ethereum network users.

## Transactions and Blocks on zkEVM

In our current design of the Polygon zkEVM, **one transaction is equivalent to one block on Layer 2 (i.e. zkEVM)**. This enhances RPC and peer-to-peer communication between nodes. Additionally, there is more compatibility with current tooling and fast finality in L2 which helps in locating the user's txs.

There is one L2 block per transaction on the zkEVM network. Later, **a collection of L2 transactions is combined into a batch. This batch is posted on L1 for data availablity and it must be verified**. Therefore, a proof for a single batch or a proof for a sequence of batches can be created.

For example, imagine the case where batches 2 to 24 have been posted on-chain and are waiting to be verified. The aggregator could:

- Build a proof for
	- batch 2
	- batch 3 to 20
	- batch 21 to 24
- Aggregate the 3 proofs, and
- Send proof to L1 (Ethereum)