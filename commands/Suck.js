const { Command } = require('discord-akairo')
const Util = require('../helpers/Util')
class SuckCommand extends Command {
  constructor () {
    super('suck', {
      aliases: ['suck', 'succ'],
      cooldown: 2 * 60 * 60 * 1000,
      ratelimit: 1,
      args: [
        {
          id: 'member',
          type: 'member'
        }
      ]
    })
  }

  async exec (message, args) {
    const smallPercentage = Util.GetConfigVar('SUCK_SMALL_PERCENTAGE')
    const bigPercentage = Util.GetConfigVar('SUCK_BIG_PERCENTAGE')

    const authorID = message.member.user.id
    const mentionID = args.member.id
    if (authorID === mentionID) {
      return message.reply(`You wanna suck yourself faggot? Disgusting`)
    }
    const authorUser = await Util.FindUser(this.client.sequelize, authorID, message.member.guild.id)
    const mentionUser = await Util.FindUser(this.client.sequelize, mentionID, message.member.guild.id)

    const suckChance = Util.GetRandomInt(1, 3)

    if (suckChance === 1) {
      // suck small
      let amount = Math.round(mentionUser.cashMoney * smallPercentage / 100)

      mentionUser.cashMoney -= amount
      authorUser.cashMoney += amount

      message.reply(`You sucked <@${mentionID}> off. They paid you $${amount} for your mediocre succ :unamused:`)
    } else if (suckChance === 2) {
      // suck big
      let amount = Math.round(mentionUser.cashMoney * bigPercentage / 100)

      mentionUser.cashMoney -= amount
      authorUser.cashMoney += amount

      message.reply(`You sucked <@${mentionID}> off. They paid you $${amount} for your **AMAZING SUCC** :open_mouth:`)
    } else {
      message.reply(`You accidentally bit <@${mentionID}>'s dick, got your ass kicked and didn't get paid.`)
    }
    await mentionUser.save()
    await authorUser.save()
  }
}

module.exports = SuckCommand
