module.exports = function (sequelize, DataTypes) {
  return sequelize.define('guild', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      allowNull: true },
    guildID: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    settings: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true }
  })
}
