module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      allowNull: true },
    cashMoney: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false,
      defaultValue: 100
    },
    bankMoney: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false,
      defaultValue: 0
    },
    discordID: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    guildID: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    }
  })
}
