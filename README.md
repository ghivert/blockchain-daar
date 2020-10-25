# TME4 Blockchain

## Creation of a blockchain from scratch

> In this TME, we will build a blockchain for cryptocurrencies from scratch. We’ll go step by step to get a functionnal blockchain. This TME can be made in any language, but all instructions will be given in JavaScript with Node.js support.

## Node installation

Follow the installation instructions on the home page.

```bash
npm install -g yarn
```

```bash
yarn # Install the dependencies
yarn start # Start the program
```

## Blocks

First, we need to be able to create blocks. A block is composed of a hash, identifying it uniquely, the pointer of the previous block, a nonce (we’ll see why later), a content (right now a string), an array of transactions and a timestamp.

1. Propose a data structure for a block creation.
2. Write a function to compute the hash of a block. The hash of a block is the result of `SHA256(previousBlockHash + timestamp + content)`. The SHA256 can be found in the Node.js `crypto` package with `createHash`.
3. Write a really simple main which we’ll handle a list of blocks and add a new one periodically (every minute for example) without transactions. Keep in mind you’ll need a genesis block to get started. (So write a function to create genesis block.)
4. Log the operation to see the blockchain running.

## Wallets

Now that we have a running blockchain, we need to let users use it. We need a way to identify a user (i.e. they should have a wallet). We should generate a new RSA keypair for every user. Use `node-rsa` to generate a new keyPair of RSA keys. You then will have to create an object data structure to manage Wallets. They should have the keys, a balance of coins, an array of transactions, an array of pending transactions and an address.

1. Create a data structure for wallet creation. At first everything is empty and the balance is 0. The address is the result of `SHA256(publicKey)`.
2. Check you can generate new wallets easily.

## Transactions

Now we need to create transactions to send coins from one user to another. A transaction should be identified by an ID, a sender address, a recipient address, a balance and a signature. It should also contain the public key of the sender.

1. Create a data structure for transaction creation.
2. Create the ID of a transaction. It should be the result of `SHA256(sender + recipient + balance)`.
3. Write a function to generate the signature of a transaction. This should take the id as input.

## Bundling it together

In your main, create two Wallets, and issue a transaction from one wallet to another.

1. Add some money to first wallet to be able to send coins from first to second. To determine the value of the wallet at start, the wallet should query the blockchain and check the balance in achieved transactions.
   - Modify the genesis block to accept initial recipients balance.
   - Update the wallet to update the balance according to the transactions in blockchain.
2. Creates and sign the transaction.
3. Put the transaction in pending state in the wallet and in the blockchain.
4. When the timer passed, the blockchain should resolve the transaction and check that signature is correct for the issuer Wallet and that the wallet has still enough money.
5. If it’s right, the transaction pass and the blockchain should update all wallets. If it’s false, it’s rejected.

## Adding some difficulties

We will change a little bit the rules. We need to add difficulties to be sure no one will try to cheat. In the block generation, the hash should start with 6 `0`. To do it, add a nonce (an integer) and add it to the hash `SHA256(previousHash + timestamp + content + nonce)`. If the hash doesn’t start with 6 `0`, increment the nonce and restart the process.

1. Remove the timer.
2. Generate as much block as possible the quickest possible. When a new block has been mined, another one will be mined too. If no transactions are pending, then the block is produced without transactions.
3. To be correct, the id of the block must start with 6 `0`.
4. Watch your computer burn to hell to find the correct hash. If your computer is too fast, try to increase the difficulty to 8 or 10 `0`.
