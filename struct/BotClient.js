const { AkairoClient } = require('discord-akairo')
const Sequelize = require('sequelize')
const glob = require('glob')
const path = require('path')

class BotClient extends AkairoClient {
  constructor () {
    super({
      ownerID: '264117586927681546',
      ignoreCooldown: '264117586927681546',
      ignorePermissions: ['264117586927681546'],
      commandDirectory: './commands/',
      inhibitorDirectory: './inhibitors/',
      listenerDirectory: './listeners/',
      prefix: (message) => message.content.startsWith('thot') ? 'thot' : 'Thot', // hacky way to override case sensitive shit
      disableEveryone: true
    })

    this.sequelize = new Sequelize({ dialect: 'sqlite',
      storage: './database/db.sqlite',
      omitNull: true,
      logging: false
    })
  }
  async setupSequelize () {
    glob.sync('./models/*.js').forEach(async (file) => {
      const model = this.sequelize.import(path.resolve(file))
      await model.sync()
    })
  }

  async start (token) {
    await this.login(token)
    await this.setupSequelize()
  }
}

module.exports = BotClient
