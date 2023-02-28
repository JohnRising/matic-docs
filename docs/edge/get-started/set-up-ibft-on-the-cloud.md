---
id: set-up-ibft-on-the-cloud
title: Cloud Setup
description: "Step-by-step cloud setup guide."
keywords:
  - docs
  - polygon
  - edge
  - cloud
  - setup
  - genesis
---

:::info This guide is for mainnet or testnet setups

The below guide will instruct you on how to set up a Polygon Edge network on a cloud provider for a production setup of your testnet or mainnet.

If you would like to setup a Polygon Edge network locally to quickly test the `polygon-edge` before doing a production-like setup, please refer to
**[Local Setup](/docs/edge/get-started/set-up-ibft-locally)**
:::

## Requirements

Refer to [Installation](/docs/edge/get-started/installation) to install Polygon Edge.

### Setting up the VM connectivity

Depending on your choice of cloud provider, you may set up connectivity and rules between the VMs using a firewall,
security groups, or access control lists.

As the only part of the `polygon-edge` that needs to be exposed to other VMs is the libp2p server, simply allowing
all communication between VMs on the default libp2p port `1478` is enough.

## Overview

![Cloud setup](/img/edge/ibft-setup/cloud.svg)

In this guide, our goal is to establish a working `polygon-edge` blockchain network working with [IBFT consensus protocol](https://github.com/ethereum/EIPs/issues/650).
The blockchain network will consist of 4 nodes of whom all 4 are validator nodes, and as such are eligible for both proposing block, and validating blocks that came from other proposers.
Each of the 4 nodes will run on their own VM, as the idea of this guide is to give you a fully functional Polygon Edge network while keeping the validator keys private to ensure a trustless network setup.

To achieve that, we will guide you through 4 easy steps:

0. Take a look at the list of **Requirements** above
1. Generate the private keys for each of the validators, and initialize the data directory
2. Prepare the connection string for the bootnode to be put into the shared `genesis.json`
3. Create the `genesis.json` on your local machine, and send/transfer it to each of the nodes
4. Start all the nodes 

:::info Number of validators

There is no minimum to the number of nodes in a cluster, which means clusters with only 1 validator node are possible.
Keep in mind that with a _single_ node cluster, there is **no crash tolerance** and **no BFT guarantee**.

The minimum recommended number of nodes for achieving a BFT guarantee is 4 - since in a 4 node cluster, the failure of
1 node can be tolerated, with the remaining 3 functioning normally.

:::

## Step 1: Initialize data folders and generate validator keys

To get up and running with Polygon Edge, you need to initialize the data folders, on each node:


````bash
node-1> polygon-edge secrets init --data-dir data-dir
````

````bash
node-2> polygon-edge secrets init --data-dir data-dir
````

````bash
node-3> polygon-edge secrets init --data-dir data-dir
````

````bash
node-4> polygon-edge secrets init --data-dir data-dir
````

Each of these commands will print the validator key, bls public key and the [node ID](https://docs.libp2p.io/concepts/peer-id/). You will need the Node ID of the first node for the next step.

### Outputting Secrets 
The secrets output can be retrieved again, if needed.

```bash
polygon-edge secrets output --data-dir test-chain-4
```

:::warning Keep your data directory to yourself!

The data directories generated above, besides initializing the directories for holding the blockchain state, will also generate your validator's private keys.
**This key should be kept as a secret, as stealing it would render somebody capable of impersonating you as the validator in the network!**
:::

## Step 2: Prepare the multiaddr connection string for the bootnode

For a node to successfully establish connectivity, it must know which `bootnode` server to connect to gain
information about all the remaining nodes on the network. The `bootnode` is sometimes also known as the `rendezvous` server in p2p jargon.

`bootnode` is not a special instance of a Polygon Edge node. Every Polygon Edge node can serve as a `bootnode` and
every Polygon Edge node needs to have a set of bootnodes specified which will be contacted to provide information on how to connect with
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

As the first part of the multiaddr connection string is the `<ip_address>`, here you will need to enter the IP address as reachable by other nodes, depending on your setup this might be a private or a public IP address, not `127.0.0.1`.

For the `<port>` we will use `1478`, since it is the default libp2p port.

And lastly, we need the `<node_id>` which we can get from the output of the previously ran command `polygon-edge secrets init --data-dir data-dir` command (which was used to generate keys and data directories for the `node 1`)

After the assembly, the multiaddr connection string to the `node 1` which we will use as the bootnode will look something like this (only the `<node_id>` which is at the end should be different):
```
/ip4/<public_or_private_ip>/tcp/1478/p2p/16Uiu2HAmJxxH1tScDX2rLGSU9exnuvZKNM9SoK3v315azp68DLPW
```
Similarly, we construct multiaddr for the second bootnode as shown below
```
/ip4/<public_or_private_ip>/tcp/1478/p2p/16Uiu2HAmS9Nq4QAaEiogE4ieJFUYsoH28magT7wSvJPpfUGBj3Hq 
```
:::info DNS hostnames instead of ips

Polygon Edge supports using DNS hostnames for the nodes configuration. This is a very helpful feature for cloud based deployments, as the node's ip may change due to various reasons.

The multiaddr format for the connection string while using DNS hostnames is as it follows:
`/dns4/sample.hostname.com/tcp/<port>/p2p/nodeid`

:::

## Step 3: Generate the genesis file with the 4 nodes as validators

This step can be run on your local machine, but you will need the public validator keys for each of the 4 validators.

Validators can safely share the `Public key (address)` as displayed below in the output to their `secrets init` commands, so that
you may securely generate the genesis.json with those validators in the initial validator set, identified by their public keys:

```
[SECRETS INIT]
Public key (address) = 0xC12bB5d97A35c6919aC77C709d55F6aa60436900
BLS Public key       = 0x9952735ca14734955e114a62e4c26a90bce42b4627a393418372968fa36e73a0ef8db68bba11ea967ff883e429b3bfdf
Node ID              = 16Uiu2HAmVZnsqvTwuzC9Jd4iycpdnHdyVZJZTpVC8QuRSKmZdUrf
```

Given that you have received all 4 of the validators' public keys, you can run the following command to generate the `genesis.json`

````bash
polygon-edge genesis --consensus ibft --ibft-validator 0xC12bB5d97A35c6919aC77C709d55F6aa60436900:0x9952735ca14734955e114a62e4c26a90bce42b4627a393418372968fa36e73a0ef8db68bba11ea967ff883e429b3bfdf --ibft-validator <2nd validator IBFT public key>:<2nd validator BLS public key> --ibft-validator <3rd validator IBFT public key>:<3rd validator BLS public key> --ibft-validator <4th validator IBFT public key>:<4th validator BLS public key> --bootnode=<first_bootnode_multiaddr_connection_string_from_step_2> --bootnode <second_bootnode_multiaddr_connection_string_from_step_2> --bootnode <optionally_more_bootnodes>
````

What this command does:

* The `--ibft-validator` sets the public key of the validator that should be included in the initial validator set in the genesis block. There can be many initial validators.
* The `--bootnode` sets the address of the bootnode that will enable the nodes to find each other.
  We will use the multiaddr string of the `node 1`, as mentioned in **step 2**, although you can add as many bootnodes as you want, as displayed above.

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

After specifying the:
1. Public keys of the validators to be included in the genesis block as the validator set
2. Bootnode multiaddr connection strings
3. Premined accounts and balances to be included in the genesis block

and generating the `genesis.json`, you should copy it over to all of the VMs in the network. Depending on your setup you may
copy/paste it, send it to the node operator, or simply SCP/FTP it over.

The structure of the genesis file is covered in the [CLI Commands](/docs/edge/get-started/cli-commands) section.

## Step 4: Run all the clients

:::note Networking on Cloud providers

Most cloud providers don't expose the IP addresses (especially public ones) as a direct network interface on your VM but rather setup an invisible NAT proxy.


To allow the nodes to connect to each other in this case you would need to listen on the `0.0.0.0` IP address to bind on all interfaces, but you would still need to specify the IP address or DNS address which other nodes can use to connect to your instance. This is achieved either by using the `--nat` or `--dns` argument where you can specify your external IP or DNS address respectively.

#### Example

The associated IP address that you wish to listen on is `192.0.2.1`, but it is not directly bound to any of your network interfaces.

To allow the nodes to connect you would pass the following parameters:

`polygon-edge ... --libp2p 0.0.0.0:10001 --nat 192.0.2.1`

Or, if you wish to specify a DNS address `dns/example.io`, pass the following parameters:

`polygon-edge ... --libp2p 0.0.0.0:10001 --dns dns/example.io`

This would make your node listen on all interfaces, but also make it aware that the clients are connecting to it through the specified `--nat` or `--dns` address.

:::

To run the **first** client:


````bash
node-1> polygon-edge server --data-dir ./data-dir --chain genesis.json  --libp2p 0.0.0.0:1478 --nat <public_or_private_ip> --seal
````

To run the **second** client:

````bash
node-2> polygon-edge server --data-dir ./data-dir --chain genesis.json --libp2p 0.0.0.0:1478 --nat <public_or_private_ip> --seal
````

To run the **third** client:

````bash
node-3> polygon-edge server --data-dir ./data-dir --chain genesis.json --libp2p 0.0.0.0:1478 --nat <public_or_private_ip> --seal
````

To run the **fourth** client:

````bash
node-4> polygon-edge server --data-dir ./data-dir --chain genesis.json --libp2p 0.0.0.0:1478 --nat <public_or_private_ip> --seal
````

After running the previous commands, you have set up a 4 node Polygon Edge network, capable of sealing blocks and recovering
from node failure.

:::info Start the client using config file

Instead of specifying all configuration parameters as CLI arguments, the Client can also be started using a config file by executing the following command: 

````bash 
polygon-edge server --config <config_file_path>
````
Example :

````bash
polygon-edge server --config ./test/config-node1.json
````
Currently, we only support `json` based configuration file, sample config file can be found **[here](/docs/edge/configuration/sample-config)**

:::

:::info Steps to run a non-validator node 

A Non-validator will always sync the latest blocks received from the validator node, you can start a non-validator node by running the following command.

````bash 
polygon-edge server --data-dir <directory_path> --chain <genesis_filename>  --libp2p <IPAddress:PortNo> --nat <public_or_private_ip>
````
For example, you can add **fifth** Non-validator client by executing the following command :

````bash
polygon-edge server --data-dir ./data-dir --chain genesis.json --libp2p 0.0.0.0:1478 --nat<public_or_private_ip>
````
:::

:::info Specify the price limit
A Polygon Edge node can be started with a set **price limit** for incoming transactions.

The unit for the price limit is `wei`.

Setting a price limit means that any transaction processed by the current node will need to have a gas price **higher**
than the set price limit, otherwise it will not be included into a block.

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
