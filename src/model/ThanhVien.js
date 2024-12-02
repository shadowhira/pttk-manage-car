const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const DiaChi = require("./DiaChi");
const DoiTac = require("./DoiTac");

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

ThanhVien.hasMany(DiaChi, { foreignKey: "maThanhVien", as: "DiaChi" });
DiaChi.belongsTo(ThanhVien, { foreignKey: "maThanhVien", as: "ThanhVien" });

ThanhVien.hasOne(DoiTac, { foreignKey: "maThanhVien" });
DoiTac.belongsTo(ThanhVien, { foreignKey: "maThanhVien" });

module.exports = ThanhVien;
