const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const ThanhVien = require("./ThanhVien");

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
