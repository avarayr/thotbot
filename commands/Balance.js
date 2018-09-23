const { Command } = require('discord-akairo')
const Util = require('../helpers/Util')
class BalanceCommand extends Command {
  constructor () {
    super('balance', {
      aliases: ['balance', 'bal', 'money'],
      cooldown: 1 * 1000,
      ratelimit: 1
    })
  }

  async exec (message) {
    const user = await Util.FindUser(this.client.sequelize, message.member.user.id, message.member.guild.id)
    return message.reply(
      this.client.util.embed()
        .setAuthor(message.member.nickname || message.author.username, Util.GetAvatarUrl(message.member.id, message.member.user.avatar))
        .setDescription(`:moneybag: **Cash**: $${user.cashMoney}\n:bank: **Bank**: $${user.bankMoney}`)
        .setColor(0x00AE86)
    )
  }
}

module.exports = BalanceCommand
