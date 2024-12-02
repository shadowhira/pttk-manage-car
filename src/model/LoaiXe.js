const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const XeOTo = require("./XeOTo"); 

const LoaiXe = sequelize.define(
  "LoaiXe",
  {
    maLoaiXe: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tenLoaiXe: {
      type: DataTypes.STRING,
    },
    thuongHieu: {
      type: DataTypes.STRING,
    },
    soChoNgoi: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "LoaiXe",
    timestamps: false,
  }
);

LoaiXe.hasMany(XeOTo, { foreignKey: "maLoaiXe" });
XeOTo.belongsTo(LoaiXe, { foreignKey: "maLoaiXe" });

module.exports = LoaiXe;
