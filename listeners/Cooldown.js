const { Listener } = require('discord-akairo')
const humanizeDuration = require('humanize-duration')
class CooldownListener extends Listener {
  constructor () {
    super('commandCooldown', {
      emitter: 'commandHandler',
      eventName: 'commandCooldown'
    })
  }

  exec (message, command, remaining) {
    const duration = humanizeDuration(remaining, { round: true })
    return message.reply(this.client.util.embed().setTitle(`:red_circle: You need to wait ${duration} before trying it again.`).setColor(0xFF0000))
  }
}

module.exports = CooldownListener
