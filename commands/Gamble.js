const { Command } = require('discord-akairo')
const Util = require('../helpers/Util')
class GambleCommand extends Command {
  constructor () {
    super('gamble', {
      aliases: ['gamble'],
      args: [
        {
          id: 'amount',
          type: 'integer'
        }
      ],
      cooldown: 2 * 60 * 1000,
      ratelimit: 1
    })
  }

  async exec (message, args) {
    const user = await Util.FindUser(this.client.sequelize, message.member.user.id, message.member.guild.id)
    const amount = Math.abs(parseInt(args.amount))

    if (amount > user.cashMoney) {
      return message.reply(`You don't even have ${amount}, asshole`)
    }

    const random = Util.GetRandomInt(0, 100)
    const chance = Util.GetConfigVar('GAMBLE_CHANCE')
    const multiplier = Util.GetConfigVar('GAMBLE_MULTIPLIER')
    if (random < chance) {
      user.cashMoney += amount * multiplier

      message.reply(
        this.client.util.embed()
          .setAuthor(message.member.nickname || message.author.username, Util.GetAvatarUrl(message.member.id, message.member.user.avatar))
          .setDescription(`:champagne_glass: You won **$${amount * multiplier}**`)
          .setColor(0x00AE86)
      )
    } else {
      user.cashMoney -= amount
      message.reply(
        this.client.util.embed()
          .setAuthor(message.member.nickname || message.author.username, Util.GetAvatarUrl(message.member.id, message.member.user.avatar))
          .setDescription(`:frowning: You lost **$${amount}**`)
          .setColor(0xFF0000)
      )
    }

    await user.save()
  }
}

module.exports = GambleCommand
