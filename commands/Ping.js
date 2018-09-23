const { Command } = require('discord-akairo')
class PingCommand extends Command {
  constructor () {
    super('ping', {
      aliases: ['ping']
    })
  }

  exec (message, args) {
    return message.reply('Pong!').then(sent => {
      const timeDiff = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt)
      const text = `🔂\u2000**RTT**: ${timeDiff} ms\n💟\u2000**Heartbeat**: ${Math.round(this.client.ping)} ms`
      return message.reply(`\n${text}`)
    })
  }
}

module.exports = PingCommand
