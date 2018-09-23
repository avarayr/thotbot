const { Command } = require('discord-akairo')
const Util = require('../helpers/Util')
class LeaderboardCommand extends Command {
  constructor () {
    super('leaderboard', {
      aliases: ['top', 'rich', 'leaderboard'],
      cooldown: 1 * 1000,
      ratelimit: 1
    })
  }

  async exec (message) {
    // const user = await Util.FindUser(this.client.sequelize, message.member.user.id, message.member.guild.id)
    let top = ''
    const leaderboard = await Util.GetLeaderboard(this.client.sequelize, message.member.guild.id)
    let counter = 1
    for (let entry of leaderboard) {
      let emote = ''
      let money = entry.get('cashMoney')
      let user = this.client.util.resolveUser(entry.get('discordID'), this.client.users)
      if (!user) {
        continue
      }
      if (counter === 1) {
        emote = ':first_place:'
      } else if (counter === 2) {
        emote = ':second_place:'
      } else if (counter === 3) {
        emote = ':third_place:'
      } else {
        emote = ':thumbsup:'
      }
      top += `${emote} ${counter}. **${user.username}**#${user.discriminator} - $${money} \n`
      counter++
    }
    return message.reply(
      this.client.util.embed()
        .setDescription(top)
        .setColor(0x00AE86)
    )
  }
}

module.exports = LeaderboardCommand
