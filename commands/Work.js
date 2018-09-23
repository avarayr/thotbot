const { Command } = require('discord-akairo')
const Util = require('../helpers/Util')
class WorkCommand extends Command {
  constructor () {
    super('work', {
      aliases: ['work'],
      cooldown: 15 * 60 * 1000,
      ratelimit: 1
    })
  }

  async exec (message) {
    const user = await Util.FindUser(this.client.sequelize, message.member.user.id, message.member.guild.id)

    const money = Util.GetRandomInt(Util.GetConfigVar('MIN_WORK_MONEY'), Util.GetConfigVar('MAX_WORK_MONEY'))
    user.cashMoney += money
    await user.save()
    return message.reply(
      this.client.util.embed()
        .setAuthor(message.member.nickname || message.author.username, Util.GetAvatarUrl(message.member.id, message.member.user.avatar))
        .setDescription(`You worked your ass off for **$${money}**`)
        .setColor(0x00AE86)
    )
  }
}

module.exports = WorkCommand
