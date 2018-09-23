const FirstInit = require('./FirstInit')
class Util {
  static async FindUser (sequelize, userID, guildID) {
    // check if user is initialized
    await FirstInit.checkUserInit(sequelize, userID, guildID)

    const UserModel = sequelize.import('../models/User.js')
    const user = await UserModel.findOne({
      where: { discordID: userID, guildID: guildID }
    })
    return user
  }
  static GetRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  static GetConfigVar (name) {
    const config = require('../config/config.json')
    return config[name]
  }
  static GetAvatarUrl (userID, avatarHash) {
    return `https://cdn.discordapp.com/avatars/${userID}/${avatarHash}.png`
  }
  static async GetLeaderboard (sequelize, guildID) {
    const UserModel = sequelize.import('../models/User.js')
    const user = await UserModel.findAll({
      where: { guildID: guildID },
      order: sequelize.literal('cashMoney DESC'),
      limit: 5
    })
    return user
  }
}
module.exports = Util
