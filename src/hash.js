const crypto = require('crypto')

const compute = content => {
  return crypto.createHash('sha256').update(content).digest('hex')
}

module.exports = { compute }
