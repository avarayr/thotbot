const { Command } = require('discord-akairo')
const Util = require('../helpers/Util')
class RobCommand extends Command {
  constructor () {
    super('rob', {
      aliases: ['rob', 'steal'],
      cooldown: 1 * 60 * 60 * 1000,
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
    const failFine = Util.GetConfigVar('ROB_FAIL_FINE')
    const smallPercentage = Util.GetConfigVar('ROB_SMALL_PERCENTAGE')
    const bigPercentage = Util.GetConfigVar('ROB_BIG_PERCENTAGE')

    const authorID = message.member.user.id
    const mentionID = args.member.id
    if (authorID === mentionID) {
      return message.reply(`You can't rob yourself, dumbass.`)
    }
    const authorUser = await Util.FindUser(this.client.sequelize, authorID, message.member.guild.id)
    const mentionUser = await Util.FindUser(this.client.sequelize, mentionID, message.member.guild.id)

    if (mentionUser.cashMoney < failFine) {
      return message.reply(`You can't rob someone who is poor as fuck (<$500) :joy:`)
    }

    const robChance = Util.GetRandomInt(1, 5)

    if (robChance === 1) {
      // rob small
      let amount = Math.round(mentionUser.cashMoney * smallPercentage / 100)

      mentionUser.cashMoney -= amount
      authorUser.cashMoney += amount

      message.reply(`You robbed <@${mentionID}> and got away with $${amount}`)
    } else if (robChance === 2) {
      // rob big
      let amount = Math.round(mentionUser.cashMoney * bigPercentage / 100)

      mentionUser.cashMoney -= amount
      authorUser.cashMoney += amount

      message.reply(`You robbed <@${mentionID}> and got away with $${amount}`)
    } else {
      // fail rob, punish robber
      authorUser.cashMoney -= failFine
      mentionUser.cashMoney += failFine

      message.reply(`You pathetic ass failed. You got beat up and gave <@${mentionID}> $${failFine} of your money`)
    }
    await mentionUser.save()
    await authorUser.save()
  }
}

module.exports = RobCommand
