const path = require('path')
class FirstInit {
  static async checkGuildInit (sequelize, guildID) {
    const GuildModel = sequelize.import(path.resolve('./models/Guild.js'))
    const guild = await GuildModel.findOne({
      where: { guildID }
    })

    if (!guild) {
      await GuildModel.create({ guildID, settings: '{}' })
    }
  }
  static async checkUserInit (sequelize, userID, guildID) {
    const UserModel = sequelize.import(path.resolve('./models/User.js'))
    const user = await UserModel.findOne({
      where: { discordID: userID, guildID }
    })

    if (!user) {
      await UserModel.create({ discordID: userID, guildID })
    }
  }
}
module.exports = FirstInit
