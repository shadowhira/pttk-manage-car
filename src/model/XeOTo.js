const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const XeChoThue = require("./XeChoThue");

const XeOTo = sequelize.define(
  "XeOTo",
  {
    maXeOTo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bienSo: {
      type: DataTypes.STRING,
      unique: true,
    },
    namSanXuat: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "XeOTo",
    timestamps: false,
  }
);

XeOTo.hasMany(XeChoThue, { foreignKey: "maXeOTo" });
XeChoThue.belongsTo(XeOTo, { foreignKey: "maXeOTo" });

module.exports = XeOTo;
