const { DataTypes } = require("sequelize");
const DAO = require("../dao/DAO");

const dao = new DAO();
const sequelize = dao.getSequelize();

const DiaChi = sequelize.define(
  "DiaChi",
  {
    maDiaChi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    soNha: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    thonXom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quanHuyen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tinhThanhPho: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "DiaChi",
    timestamps: false,
  }
);

module.exports = DiaChi;