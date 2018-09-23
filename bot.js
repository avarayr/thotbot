require('dotenv').load()
const BotClient = require('./struct/BotClient')
const client = new BotClient()

client.start(process.env.TOKEN)

process.on('unhandledRejection', err => console.error(err)) // eslint-disable-line no-console
