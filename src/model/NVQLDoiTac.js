const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const NhanVien = require("./NhanVien");
const HopDong = require("./HopDong");

const NVQLDoiTac = sequelize.define(
  "NVQLDoiTac",
  {
    maNVQLDoiTac: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    maNhanVien: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: NhanVien,
        key: "maThanhVien",
      },
    },
  },
  {
    tableName: "NVQLDoiTac",
    timestamps: false,
  }
);

NhanVien.hasOne(NVQLDoiTac, { foreignKey: "maThanhVien" });
NVQLDoiTac.belongsTo(NhanVien, { foreignKey: "maThanhVien" });

NVQLDoiTac.hasMany(HopDong, { foreignKey: "maNVQLDoiTac" });
HopDong.belongsTo(NVQLDoiTac, { foreignKey: "maNVQLDoiTac" });

module.exports = NVQLDoiTac;
