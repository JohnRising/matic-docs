---
id: set-up-ibft-locally
title: Local Setup
description: "Step-by-step local setup guide."
keywords:
  - docs
  - polygon
  - edge
  - local
  - setup
  - genesis
---

:::caution This guide is for testing purposes only

The below guide will instruct you on how to set up a Polygon Edge network on your local machine for testing and development
purposes.

The procedure differs greatly from the way you would want to set up Polygon Edge network for a real use scenario on
a cloud provider: **[Cloud Setup](/docs/edge/get-started/set-up-ibft-on-the-cloud)**

:::


## Requirements

Refer to [Installation](/docs/edge/get-started/installation) to install Polygon Edge.

## Overview

![Local Setup](/img/edge/ibft-setup/local.svg)

In this guide, our goal is to establish a working `polygon-edge` blockchain network working with [IBFT consensus protocol](https://github.com/ethereum/EIPs/issues/650).
The blockchain network will consist of 4 nodes of whom all 4 are validator nodes, and as such are eligible for both proposing block, and validating blocks that came from other proposers.
All 4 nodes will run on the same machine, as the idea of this guide is to give you a fully functional IBFT cluster in the least amount of time.

To achieve that, we will guide you through 4 easy steps:

1. Initializing data directories will generate both the validator keys for each of the 4 nodes, and initialize empty blockchain data directories. The validator keys are important as we need to bootstrap the genesis block with the initial set of validators using these keys.
2. Preparing the connection string for the bootnode will be the vital information for every node we will run as to which node to connect to when starting for the first time.
3. Generating the `genesis.json` file will require as input both the validator keys generated in **step 1** used for setting the initial validators of the network in the genesis block and the bootnode connection string from **step 2**.
4. Running all the nodes is the end goal of this guide and will be the last step we do, we will instruct the nodes which data directory to use and where to find the `genesis.json` which bootstraps the initial network state.

As all four nodes will be running on localhost, during the setup process it is expected that all the data directories
for each of the nodes are in the same parent directory.

:::info Number of validators

There is no minimum to the number of nodes in a cluster, which means clusters with only 1 validator node are possible.
Keep in mind that with a _single_ node cluster, there is **no crash tolerance** and **no BFT guarantee**.

The minimum recommended number of nodes for achieving a BFT guarantee is 4 - since in a 4 node cluster, the failure of
1 node can be tolerated, with the remaining 3 functioning normally.

:::

## Step 1: Initialize data folders for IBFT and generate validator keys

In order to get up and running with IBFT, you need to initialize the data folders,
one for each node:

````bash
polygon-edge secrets init --data-dir test-chain-1
````

````bash
polygon-edge secrets init --data-dir test-chain-2
````

````bash
polygon-edge secrets init --data-dir test-chain-3
````

````bash
polygon-edge secrets init --data-dir test-chain-4
````

Each of these commands will print the validator key, bls public key and the [node ID](https://docs.libp2p.io/concepts/peer-id/). You will need the Node ID of the first node for the next step.

### Outputting Secrets 
The secrets output can be retrieved again, if needed.

```bash
polygon-edge secrets output --data-dir test-chain-4
```

## Step 2: Prepare the multiaddr connection string for the bootnode

For a node to successfully establish connectivity, it must know which `bootnode` server to connect to in order to gain
information about all the remaining nodes on the network. The `bootnode` is sometimes also known as the `rendezvous` server in p2p jargon.

`bootnode` is not a special instance of the polygon-edge node. Every polygon-edge node can serve as a `bootnode`, but
every polygon-edge node needs to have a set of bootnodes specified which will be contacted to provide information on how to connect with
all remaining nodes in the network.

To create the connection string for specifying the bootnode, we will need to conform 
to the [multiaddr format](https://docs.libp2p.io/concepts/addressing/):
```
/ip4/<ip_address>/tcp/<port>/p2p/<node_id>
```

In this guide, we will treat the first and second nodes as the bootnodes for all other nodes. What will happen in this scenario
is that nodes that connect to the `node 1` or `node 2` will get information on how to connect to one another through the mutually
contacted bootnode. 

:::info You need to specify at least one bootnode to start a node

At least **one** bootnode is required, so other nodes in the network can discover each other. More bootnodes are recommended, as
they provide resilience to the network in case of outages.
In this guide we will list two nodes, but this can be changed on the fly, with no impact on the validity of the `genesis.json` file.
:::

Since we are running on localhost, it is safe to assume that the `<ip_address>` is `127.0.0.1`.

For the `<port>` we will use `10001` since we will configure the libp2p server for `node 1` to listen on this port later.

And lastly, we need the `<node_id>` which we can get from the output of the previously ran command `polygon-edge secrets init --data-dir test-chain-1` command (which was used to generate keys and data directories for the `node1`)

After the assembly, the multiaddr connection string to the `node 1` which we will use as the bootnode will look something like this (only the `<node_id>` which is at the end should be different):
```
/ip4/127.0.0.1/tcp/10001/p2p/16Uiu2HAmJxxH1tScDX2rLGSU9exnuvZKNM9SoK3v315azp68DLPW
```
Similarly, we construct the multiaddr for second bootnode as shown below
```
/ip4/127.0.0.1/tcp/20001/p2p/16Uiu2HAmS9Nq4QAaEiogE4ieJFUYsoH28magT7wSvJPpfUGBj3Hq 
```

:::info DNS hostnames instead of ips

Polygon Edge supports using DNS hostnames for the nodes configuration. This is a very helpful feature for cloud based deployments, as the node's ip may change due to various reasons.

The multiaddr format for the connection string while using DNS hostnames is as it follows:
`/dns4/sample.hostname.com/tcp/<port>/p2p/nodeid`

:::


## Step 3: Generate the genesis file with the 4 nodes as validators

````bash
polygon-edge genesis --consensus ibft --ibft-validators-prefix-path test-chain- --bootnode /ip4/127.0.0.1/tcp/10001/p2p/16Uiu2HAmJxxH1tScDX2rLGSU9exnuvZKNM9SoK3v315azp68DLPW --bootnode /ip4/127.0.0.1/tcp/20001/p2p/16Uiu2HAmS9Nq4QAaEiogE4ieJFUYsoH28magT7wSvJPpfUGBj3Hq 
````

What this command does:

* The `--ibft-validators-prefix-path` sets the prefix folder path to the one specified which IBFT in Polygon Edge can
  use. This directory is used to house the `consensus/` folder, where the validator's private key is kept. The
  validator's public key is needed in order to build the genesis file - the initial list of bootstrap nodes.
  This flag only makes sense when setting up the network on localhost, as in a real-world scenario we cannot expect all
  the nodes' data directories to be on the same filesystem from where we can easily read their public keys.
* The `--bootnode` sets the address of the bootnode that will enable the nodes to find each other.
  We will use the multiaddr string of the `node 1`, as mentioned in **step 2**.

The result of this command is the `genesis.json` file which contains the genesis block of our new blockchain, with the predefined validator set and the configuration for which node to contact first in order to establish connectivity.

:::info Switch to ECDSA

BLS is the default validation mode of block headers. If you want your chain to run in ECDSA mode, you can use use the flag `—ibft-validator-type`, with the argument `ecdsa`:

```
genesis --ibft-validator-type ecdsa
```
:::
:::info Premining account balances

You will probably want to set up your blockchain network with some addresses having "premined" balances.

To achieve this, pass as many `--premine` flags as you want per address that you want to be initialized with a certain balance
on the blockchain.

For example, if we would like to premine 1000 ETH to address `0x3956E90e632AEbBF34DEB49b71c28A83Bc029862` in our genesis block, then we would need to supply the following argument:

```
--premine=0x3956E90e632AEbBF34DEB49b71c28A83Bc029862:1000000000000000000000
```

**Note that the premined amount is in WEI, not ETH.**

:::

:::info Set the block gas limit

The default gas limit for each block is `5242880`. This value is written in the genesis file, but you may want to
increase / decrease it.

To do so, you can use the flag `--block-gas-limit` followed by the desired value as shown below :

```shell
--block-gas-limit 1000000000
```
:::

:::info Set system file descriptor limit

The default file descriptor limit (maximum number of open files) can be low, and on Linux, everything is a file.
If the nodes are expected to have high throughput, you might consider increasing this limit.
Check the official docs of your linux distro for more details.

#### Check current os limits ( open files )
```shell title="ulimit -n"
1024 # Ubuntu default
```

#### Increase open files limit
- Running `polygon-edge` in foreground (shell)
  ```shell title="Set FD limit for the current session"
  ulimit -n 65535 # affects only current session, limit won't persist after logging out
  ```

  ```shell title="Edit /etc/security/limits.conf"
  # add the following lines to the end of the file to modify FD limits
  *               soft    nofile          65535 # sets FD soft limit for all users
  *               hard    nofile          65535 # sets FD hard limit for all users

  # End of file
  ```
  Save the file and restart the system.

- Running `polygon-edge` in the background as a service

  If `polygon-edge` is run as a system service, using the tool like `systemd`, file descriptor limits
  should be managed using `systemd`.
  ```shell title="Edit /etc/systemd/system/polygon-edge.service"
  [Service]
   ...
  LimitNOFILE=65535
  ```

### Troubleshooting
```shell title="Watch FD limits of polygon edge running process"
watch -n 1 "ls /proc/$(pidof polygon-edge)/fd | wc -l"
```

```shell title="Check max FD limits for polygon-edge running process"
cat /proc/$(pidof polygon-edge)/limits
```
:::


## Step 4: Run all the clients

Because we are attempting to run a Polygon Edge network consisting of 4 nodes all on the same machine, we need to take care to 
avoid port conflicts. This is why we will use the following reasoning for determining the listening ports of each server of a node:

- `10000` for the gRPC server of `node 1`, `20000` for the GRPC server of `node 2`, etc.
- `10001` for the libp2p server of `node 1`, `20001` for the libp2p server of `node 2`, etc.
- `10002` for the JSON-RPC server of `node 1`, `20002` for the JSON-RPC server of `node 2`, etc.

To run the **first** client (note the port `10001` since it was used as a part of the libp2p multiaddr in **step 2** alongside node 1's Node ID):

````bash
polygon-edge server --data-dir ./test-chain-1 --chain genesis.json --grpc-address :10000 --libp2p :10001 --jsonrpc :10002 --seal
````

To run the **second** client:

````bash
polygon-edge server --data-dir ./test-chain-2 --chain genesis.json --grpc-address :20000 --libp2p :20001 --jsonrpc :20002 --seal
````

To run the **third** client:

````bash
polygon-edge server --data-dir ./test-chain-3 --chain genesis.json --grpc-address :30000 --libp2p :30001 --jsonrpc :30002 --seal
````

To run the **fourth** client:

````bash
polygon-edge server --data-dir ./test-chain-4 --chain genesis.json --grpc-address :40000 --libp2p :40001 --jsonrpc :40002 --seal
````

To briefly go over what has been done so far:

* The directory for the client data has been specified to be **./test-chain-\***
* The GRPC servers have been started on ports **10000**, **20000**, **30000** and **40000**, for each node respectively
* The libp2p servers have been started on ports **10001**, **20001**, **30001** and **40001**, for each node respectively
* The JSON-RPC servers have been started on ports **10002**, **20002**, **30002** and **40002**, for each node respectively
* The *seal* flag means that the node which is being started is going to participate in block sealing
* The *chain* flag specifies which genesis file should be used for chain configuration

The structure of the genesis file is covered in the [CLI Commands](/docs/edge/get-started/cli-commands) section.

After running the previous commands, you have set up a 4 node Polygon Edge network, capable of sealing blocks and recovering
from node failure.

:::info Start the client using config file

Instead of specifying all configuration parameters as CLI arguments, the Client can also be started using a config file by executing the following command: 

````bash 
polygon-edge server --config <config_file_path>
````
Example:

````bash
polygon-edge server --config ./test/config-node1.json
````
Currently, we support `yaml` and `json` based configuration files, sample config files can be found **[here](/docs/edge/configuration/sample-config)**

:::

:::info Steps to run a non-validator node 

A Non-validator will always sync the latest blocks received from the validator node, you can start a non-validator node by running the following command.

````bash 
polygon-edge server --data-dir <directory_path> --chain <genesis_filename> --grpc-address <portNo> --libp2p <portNo> --jsonrpc <portNo>
````
For example, you can add **fifth** Non-validator client by executing the following command :

````bash
polygon-edge server --data-dir ./test-chain --chain genesis.json --grpc-address :50000 --libp2p :50001 --jsonrpc :50002 
````
:::

:::info Specify the price limit
A Polygon Edge node can be started with a set **price limit** for incoming transactions.

The unit for the price limit is `wei`.

Setting a price limit means that any transaction processed by the current node will need to have a gas price **higher**
then the set price limit, otherwise it will not be included in a block.

Having the majority of nodes respect a certain price limit enforces the rule that transactions in the network
cannot be below a certain price threshold.

The default value for the price limit is `0`, meaning it is not enforced at all by default.

Example of using the `--price-limit` flag:
````bash
polygon-edge server --price-limit 100000 ...
````

It is worth noting that price limits **are enforced only on non-local transactions**, meaning
that the price limit does not apply to transactions added locally on the node.
:::

:::info WebSocket URL
By default, when you run the Polygon Edge, it generates a WebSocket URL based on the chain location.
The URL scheme `wss://` is used for HTTPS links, and `ws://` for HTTP.

Localhost WebSocket URL:
````bash
ws://localhost:10002/ws
````
Please note that the port number depends on the chosen JSON-RPC port for the node.

Edgenet WebSocket URL:
````bash
wss://rpc-edgenet.polygon.technology/ws
````
:::



## Step 5: Interact with the polygon-edge network

Now that you've set up at least 1 running client, you can go ahead and interact with the blockchain using the account you premined above
and by specifying the JSON-RPC URL to any of the 4 nodes:
- Node 1: `http://localhost:10002`
- Node 2: `http://localhost:20002`
- Node 3: `http://localhost:30002`
- Node 4: `http://localhost:40002`

Follow this guide to issue operator commands to the newly built cluster: [How to query operator information](/docs/edge/working-with-node/query-operator-info) (the GRPC ports for the cluster we have built are `10000`/`20000`/`30000`/`40000` for each node respectively)
