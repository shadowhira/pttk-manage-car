const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const LoiHongXeThue = require("./LoiHongXeThue");

const XeChoThue = sequelize.define(
  "XeChoThue",
  {
    maXeChoThue: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ngayNhanXe: {
      type: DataTypes.DATE,
    },
    ngayTraXe: {
      type: DataTypes.DATE,
    },
    giaThue: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: "XeChoThue",
    timestamps: false,
  }
);

XeChoThue.hasMany(LoiHongXeThue, { foreignKey: "maXeChoThue" });
LoiHongXeThue.belongsTo(XeChoThue, { foreignKey: "maXeChoThue" });

module.exports = XeChoThue;
