const Hash = require('./hash')

const create = (sender, { recipient, balance }) => {
  const id = Hash.compute(sender.address + recipient + balance.toString())
  const signature = sender.key.sign(id, 'hex')
  return {
    id,
    sender: sender.address,
    senderPublic: sender.publicKey,
    recipient,
    balance,
    signature,
  }
}

module.exports = { create }
