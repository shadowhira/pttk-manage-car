const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const LoiHongXeThue = require("./LoiHongXeThue");

const LoiHong = sequelize.define(
  "LoiHong",
  {
    maLoiHong: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tenLoi: {
      type: DataTypes.STRING,
    },
    moTa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "LoiHong",
    timestamps: false,
  }
);

LoiHong.hasMany(LoiHongXeThue, { foreignKey: "maLoiHong" });
LoiHongXeThue.belongsTo(LoiHong, { foreignKey: "maLoiHong" });

module.exports = LoiHong;
