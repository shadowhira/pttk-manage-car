const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const LoiHongXeThue = sequelize.define(
  "LoiHongXeThue",
  {
    maLoiHongXeThue: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    tableName: "LoiHongXeThue",
    timestamps: false,
  }
);

module.exports = LoiHongXeThue;
