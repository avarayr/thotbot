const { AkairoClient } = require('discord-akairo')
const { token } = require('./auth.json')
const client = new AkairoClient({
  ownerID: '264117586927681546',
  prefix: 'thot',
  commandDirectory: './commands/'
}, {
  disableEveryone: true
})

client.login(token)
