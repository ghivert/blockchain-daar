const NodeRSA = require('node-rsa')
const Hash = require('./hash')
const Block = require('./block')
const Transaction = require('./transaction')
const Wallet = require('./wallet')

const initialTransaction = ([recipient, balance]) => {
  const origin = {
    address: '0x0000000000000000000000000',
    key: { sign: () => 'true' },
  }
  return Transaction.create(origin, { recipient, balance })
}

const genesis = ({ recipients }) => {
  const transactions = Object.entries(recipients).map(initialTransaction)
  const block = {
    id: '0x0000000000000000000000000',
    previous: null,
    nonce: 0,
    content: '',
    timestamp: Date.now(),
    transactions,
  }
  return { block, wallets: recipients, pendingTransactions: [] }
}

const keepValidTransaction = ({ senderPublic, id, sender, signature }) => {
  const key = new NodeRSA()
  key.importKey(senderPublic, 'pkcs1-public')
  const isValidSignature = key.verify(id, signature, 'utf8', 'hex')
  const isCorrectAddress = sender === Hash.compute(senderPublic)
  return isValidSignature && isCorrectAddress
}

const updateWallets = blockchain => transaction => {
  blockchain.wallets[transaction.sender] -= transaction.balance
  blockchain.wallets[transaction.recipient] += transaction.balance
}

const checkAndPassAllTransactions = blockchain => {
  const { pendingTransactions } = blockchain
  blockchain.pendingTransactions = []
  const transactions = pendingTransactions.filter(keepValidTransaction)
  blockchain.block = Block.create({
    previous: blockchain.block,
    content: Date.now().toString(),
    transactions,
  })
  transactions.forEach(updateWallets(blockchain))
  const print = new Date()
  console.log(
    `${print.getHours()}:${print.getMinutes()}:${print.getSeconds()}`,
    '| New Block emitted:',
    blockchain.block.id
  )
}

const main = () => {
  const wallet1 = new Wallet()
  const wallet2 = new Wallet()
  console.log('Wallets has been generated.')
  const recipients = { [wallet1.address]: 100, [wallet2.address]: 200 }
  const blockchain = genesis({ recipients })
  wallet1.updateBalance(blockchain)
  wallet2.updateBalance(blockchain)
  wallet1.transact(blockchain, wallet2.address, 20)
  while (true) {
    checkAndPassAllTransactions(blockchain)
  }
}

main()
