const { DataTypes } = require("sequelize");
const DAO = require("../dao/DAO");
const ThanhVien = require("./ThanhVien");

const dao = new DAO();
const sequelize = dao.getSequelize();

const NhanVien = sequelize.define(
  "NhanVien",
  {
    maNhanVien: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chucVu: {
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
    tableName: "NhanVien",
    timestamps: false,
  }
);

ThanhVien.hasOne(NhanVien, { foreignKey: "maThanhVien" });
NhanVien.belongsTo(ThanhVien, { foreignKey: "maThanhVien" });

module.exports = NhanVien;
