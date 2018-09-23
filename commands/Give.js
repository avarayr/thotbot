const { Command } = require('discord-akairo')
const Util = require('../helpers/Util')
class SuckCommand extends Command {
  constructor () {
    super('give', {
      aliases: ['give', 'share', 'give-money'],
      cooldown: 1 * 1000, // change this
      ratelimit: 1,
      args: [
        {
          id: 'member',
          type: 'member'
        },
        {
          id: 'amount',
          type: 'integer'
        }
      ]
    })
  }

  async exec (message, args) {
    const authorID = message.member.user.id
    const mentionID = args.member.id
    if (authorID === mentionID && this.client.ownerID != authorID) {
      return message.reply(`You can't give yourself money, asshole.`)
    }
    const authorUser = await Util.FindUser(this.client.sequelize, authorID, message.member.guild.id)
    const mentionUser = await Util.FindUser(this.client.sequelize, mentionID, message.member.guild.id)
    const amount = Math.abs(parseInt(args.amount))

    if (amount > authorUser.cashMoney && this.client.ownerID != authorID) {
      return message.reply(`You don't even have $${amount}`)
    }

    mentionUser.cashMoney += amount
    authorUser.cashMoney -= amount

    message.reply(`You gave <@${mentionID}> $${amount}`)
    await mentionUser.save()
    await authorUser.save()
  }
}

module.exports = SuckCommand
