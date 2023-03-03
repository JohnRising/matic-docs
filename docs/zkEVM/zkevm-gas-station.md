---
id: zkevm-gas-station
title: Polygon zkEVM Gas Station
sidebar_label: zkEVM Gas Station
description: Gas price recommendations on the Polygon zkEVM.
keywords:
  - docs
  - polygon
  - zkevm
  - gas price prediction
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

The goal of **Polygon zkEVM Gas Station** is to provide dApp developers with gas pricing suggestions so they can use it before sending transactions to the **Polygon zkEVM** network. The prediction method is modelled after the [Polygon Gas Station](/develop/tools/polygon-gas-station.md) but is unique in its own ways.

Polygon zkEVM Gas Station is currently **deployed on the Blueberry and Mango testnet of zkEVM**, where it analyzes recent 500 transactions and recommends gas price. Note that the Mango testnet will be deprecated on March 6, 2023.

## Usage

Send a GET request to the [zkEVM Gas Station endpoint](https://gasstation-mumbai.matic.today/zkevm) to get a gas price recommendation from this oracle.

### cURL

```bash
curl https://gasstation-mumbai.matic.today/zkevm
```

### JavaScript

```javascript
fetch('https://gasstation-mumbai.matic.today/zkevm')
  .then(response => response.json())
  .then(json => console.log(json))
```

### Python

```python
import requests
requests.get('https://gasstation-mumbai.matic.today/zkevm').json()
```

## Interpretation

An example JSON response will look like this.

```json
{
    "safeLow":1,
    "standard":1,
    "fast":1,
    "fastest":1,
    "blockTime":2,
    "blockNumber":308789
}
```

- {'safelow', 'standard', 'fast', 'fastest'} are gas prices in GWei, you can use these prices before sending transaction off to Polygon zkEVM, depending upon your needs
- `blockTime`, in seconds, gives average block time of the network.
- `blockNumber` provides the information of latest block mined when recommendation was made
