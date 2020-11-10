const NodeRSA = require('node-rsa')
const Transaction = require('./transaction')
const Hash = require('./hash')

class Wallet {
  constructor() {
    const key = new NodeRSA({ b: 2048 })
    const publicKey = key.exportKey('pkcs1-public')
    this.key = key
    this.balance = 0
    this.transactions = []
    this.pendingTransactions = []
    this.address = Hash.compute(publicKey)
    this.publicKey = publicKey
  }

  updateBalance(blockchain) {
    this.balance = blockchain.wallets[this.address]
  }

  transact(blockchain, recipient, amount) {
    if (amount <= this.balance) {
      blockchain.pendingTransactions.push(
        Transaction.create(this, { recipient, balance: amount })
      )
    }
  }
}

module.exports = Wallet
