const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const HopDong = require("./HopDong");
const XeOTo = require("./XeOTo");

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
    }
  },
  {
    tableName: "DoiTac",
    timestamps: false,
  }
);

DoiTac.hasMany(XeOTo, { foreignKey: "maDoiTac" });
XeOTo.belongsTo(DoiTac, { foreignKey: "maDoiTac" });

DoiTac.hasMany(HopDong, { foreignKey: "maDoiTac" });
HopDong.belongsTo(DoiTac, { foreignKey: "maDoiTac" });

module.exports = DoiTac;
