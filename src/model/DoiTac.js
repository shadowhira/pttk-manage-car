const { DataTypes } = require("sequelize");
const DAO = require("../dao/DAO");
const ThanhVien = require("./ThanhVien");

const dao = new DAO();
const sequelize = dao.getSequelize();

const DoiTac = sequelize.define(
  "DoiTac",
  {
    maDoiTac: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    soCMND: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    soTaiKhoan: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    tenNganHang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maThanhVien: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ThanhVien,
        key: "maThanhVien",
      },
    },
  },
  {
    tableName: "DoiTac",
    timestamps: false,
  }
);

// Quan hệ DoiTac - ThanhVien (1-1)
ThanhVien.hasOne(DoiTac, { foreignKey: "maThanhVien" });
DoiTac.belongsTo(ThanhVien, { foreignKey: "maThanhVien" });

module.exports = DoiTac;
