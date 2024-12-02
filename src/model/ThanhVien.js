const { DataTypes } = require("sequelize");
const DAO = require("../dao/DAO");
const DiaChi = require("./DiaChi");

const dao = new DAO();
const sequelize = dao.getSequelize();

const ThanhVien = sequelize.define(
  "ThanhVien",
  {
    maThanhVien: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ten: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taiKhoan: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    matKhau: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    soDienThoai: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "ThanhVien",
    timestamps: false,
  }
);

// Quan hệ ThanhVien - DiaChi (1-n)
ThanhVien.hasMany(DiaChi, { foreignKey: "maThanhVien", as: "DiaChi" });
DiaChi.belongsTo(ThanhVien, { foreignKey: "maThanhVien", as: "ThanhVien" });

module.exports = ThanhVien;
