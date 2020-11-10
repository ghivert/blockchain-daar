const Hash = require('./hash')

const findCorrectId = ({ id, timestamp, content }) => {
  let nonce = 0
  let hash = ''
  while (!hash.startsWith('000000')) {
    nonce += 1
    hash = Hash.compute(id + timestamp + content + nonce.toString())
  }
  return { hash, nonce }
}

const create = ({ previous, content, transactions }) => {
  const timestamp = Date.now()
  const { hash, nonce } = findCorrectId({
    id: previous.id,
    timestamp: timestamp.toString(),
    content,
  })
  return {
    id: hash,
    previous,
    nonce,
    content,
    timestamp,
    transactions: transactions || [],
  }
}

module.exports = { create }
