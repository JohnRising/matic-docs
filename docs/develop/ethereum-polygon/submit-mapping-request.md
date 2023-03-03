---
id: submit-mapping-request
title: Mapping Tokens
description:  A guide on how to map tokens between Ethereum and Polygon Chains using the PoS Bridge
keywords:
  - docs
  - polygon wiki
  - token mapping
  - pos bridge
  - polygon
  - goerli
  - ethereum
  - testnet
  - mainnet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Mapping is necessary in order to transfer your assets to and from Ethereum and Polygon PoS. We offer two bridges to do the same. More details on the bridge can be understood [here](/develop/ethereum-polygon/getting-started.md).

:::info

The Polygon PoS bridge is available for both Polygon Mainnet as well as Mumbai Testnet.

:::

## Steps to submit a mapping request

In order to map tokens between Ethereum and Polygon PoS, you may use the [Polygon Token Mapper](https://mapper.polygon.technology/). Open the link and click on the **Map New Token** button on the top right corner to initiate a new mapping request.

<img src={useBaseUrl("img/token-mapping/mapping-tool.png")} />

**Step 1 &rarr;** Choose the network on which you want to map your token. You may choose **Goerli-Mumbai** for Testnet, and **Ethereum-Polygon PoS** for the Mainnet.

**Step 2 &rarr;** Select the type of token you are mapping - **ERC20**, **ERC721**, or **ERC1155**.

**Step 3 &rarr;** Enter your **Ethereum/Goerli** token address in the **Ethereum Token Address** field. Make sure your token contract code has been verified on the **Ethereum/Goerli** blockchain explorers.

**Step 4 &rarr;** After adding the **Ethereum Token Address**, the corresponding fields viz. **Token Name, Token Symbol, and Token Decimal** will be automatically populated with the contract details.

**Step 5 &rarr;** Now, click on the **Begin Mapping** button to initiate the mapping process. As this involves an Ethereum transaction, you will need to connect your wallet to proceed.

**Step 6 &rarr;** You will be shown a review modal with the token information and the estimated gas fees to complete the mapping. Verify the details and initiate the mapping transaction by selecting the **Pay Gas Fee To Map** button.

After confirming the transaction from your wallet, you have to wait for the transaction to get completed on Ethereum. Once the transaction is completed, you will be shown the success modal with your child token address on the Polygon PoS network. You can continue to verify the mapping by checking the generated child token address on [Polygonscan](https://polygonscan.com/).

For a successful Mainnet mapping, you may provide your token details [here](https://github.com/maticnetwork/polygon-token-list/issues/new/choose) to be added on the [**Polygon Token List**](https://api-polygon-tokens.polygon.technology/tokenlists/polygonTokens.tokenlist.json).

:::tip Want a Custom Token Mapping?

In case you want to [<ins>customize your token mapping</ins>](/develop/l1-l2-communication/fx-portal.md#do-i-need-a-custom-fxtunnel-implementation-), you can visit our [**<ins>FxPortal</ins>**](/develop/l1-l2-communication/fx-portal.md) documentation and use the information provided to build your FxTunnel implementation and map tokens.

While using the **default FxPortal** tunnels, you can't modify the child contract code. In case you need a **custom child token**, you must go for your own **custom FxTunnel**.

:::

## Video Guide

Here is a quick video tutorial on how to map tokens between **Ethereum Goerli &harr; Polygon Mumbai Testnet**:

<video autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/token-mapping/token-mapper.mp4"></source>
  <p>Your browser does not support the video element.</p>
</video>
