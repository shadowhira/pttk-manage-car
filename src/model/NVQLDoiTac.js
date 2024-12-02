const { DataTypes } = require("sequelize");
const DAO = require("../dao/DAO");
const NhanVien = require("./NhanVien");

const dao = new DAO();
const sequelize = dao.getSequelize();

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

module.exports = NVQLDoiTac;
