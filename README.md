# TME4 Blockchain

## Creation of a blockchain from scratch

> In this TME, we will build a blockchain for cryptocurrencies from scratch. We’ll go step by step to get a functionnal blockchain. This TME can be made in any language, but all instructions will be given in JavaScript with Node.js support.

## Node installation

Follow the installation instructions on the home page.

## Blocks

First, we need to be able to create blocks. A block is composed of a hash, identifying it uniquely, the hash of the previous block, a nonce (we’ll see why later), a content (right now a string) and a timestamp.

1. Create a data structure for a block creation.
2. Write a function to compute the hash of a block. The hash of a block is the result of `SHA256(previousHash + timestamp + content)`.
3. Write a really simple main which we’ll handle a list of blocks and add a new one periodically (every minute for example).
4. Log the operation to see the blockchain running.

## Wallets

Now that we have a running blockchain, we need to let users use it. We need a way to identify a user (i.e. they should have a wallet). We should generate a new RSA keypair for every user. Use `node-rsa` to generate a new keyPair of RSA keys. You then will have to create an object data structure to manage Wallets. They should have the keys, a balance of coins, an array of transactions, and an array of pending transactions.

1. Create a data structure for wallet creation. At first everything is empty and the balance is 0.
2. Check you can generate new wallets easily.

## Transactions

Now we need to create transactions to send coins from one user to another. A transaction should be identified by an ID, a sender, a recipient, a balance, a signature, one output, and the remaining input of the wallet.

1. Create a data structure for transaction creation.
2. Create the ID of a transaction. It should be the result of `SHA256(from + to + value)`.
3. Write a function to generate the signature of a transaction.

## Bundling it together

In your main, create two Wallets, and issue a transaction from one wallet to another.

1. Add some money to first wallet to be able to send coins from first to second.
2. Sign the transaction.
3. Put the transaction in pending state.
4. When the timer passed, the blockchain should resolve the transaction and check that signature is correct for the issuer Wallet.
5. If it’s right, the transaction pass and the blockchain should update all wallets. If it’s false, it’s rejected.

## Adding some difficulties

We need to add difficulties to be sure no one will try to cheat. In the block generation, the hash should start with 6 `0`. To do it, add a nonce (an integer) and add it to the hash `SHA256(previousHash + timestamp + content + nonce)`. If the hash doesn’t start with 6 `0`, increment the nonce and restart the process.
