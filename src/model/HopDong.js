const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const XeChoThue = require("./XeChoThue");

const HopDong = sequelize.define(
  "HopDong",
  {
    maHopDong: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ngayKy: {
      type: DataTypes.DATE,
    },
    ngayBatDau: {
      type: DataTypes.DATE,
    },
    ngayKetThuc: {
      type: DataTypes.DATE,
    },
    giaTriHopDong: {
      type: DataTypes.FLOAT,
    },
    tinhTrang: {
      type: DataTypes.TINYINT,
    },
  },
  {
    tableName: "HopDong",
    timestamps: false,
  }
);

HopDong.hasMany(XeChoThue, { foreignKey: "maHopDong" });
XeChoThue.belongsTo(HopDong, { foreignKey: "maHopDong" });

module.exports = HopDong;
