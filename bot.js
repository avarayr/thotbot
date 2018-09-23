const BotClient = require('./struct/BotClient')
const client = new BotClient()

const { token } = require('./auth.json')
client.start(token)

process.on('unhandledRejection', err => console.error(err)) // eslint-disable-line no-console
