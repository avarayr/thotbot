const { Command } = require('discord-akairo')
const Util = require('../helpers/Util')
class SearchCommand extends Command {
  constructor () {
    super('search', {
      aliases: ['search'],
      cooldown: 30 * 1000,
      ratelimit: 1
    })
  }

  async exec (message) {
    const user = await Util.FindUser(this.client.sequelize, message.member.user.id, message.member.guild.id)

    const money = Util.GetRandomInt(Util.GetConfigVar('SEARCH_MIN'), Util.GetConfigVar('SEARCH_MAX'))
    user.cashMoney += money
    await user.save()
    return message.reply(
      this.client.util.embed()
        .setAuthor(message.member.nickname || message.author.username, Util.GetAvatarUrl(message.member.id, message.member.user.avatar))
        .setDescription(`You searched in a trash can and found **$${money}** worth of trash. Good job retard.`)
        .setColor(0x00AE86)
    )
  }
}

module.exports = SearchCommand
