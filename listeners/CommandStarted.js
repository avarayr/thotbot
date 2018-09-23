const { Listener } = require('discord-akairo')
const FirstInit = require('../helpers/FirstInit.js')
class CommandStarted extends Listener {
  constructor () {
    super('commandStarted', {
      emitter: 'commandHandler',
      eventName: 'commandStarted'
    })
  }

  async exec (message, command, args) {
    const sequelize = this.client.sequelize
    const guildID = message.member.guild.id
    const userID = message.member.user.id

    // check if server is initialized
    await FirstInit.checkGuildInit(sequelize, guildID)
    // check if user is initialized
    await FirstInit.checkUserInit(sequelize, userID, guildID)
  }
}

module.exports = CommandStarted
