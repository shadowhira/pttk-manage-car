const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');
const DiaChi = require("./DiaChi");

const CuaHang = sequelize.define('CuaHang', {
    maCuaHang: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tenCuaHang: {
        type: DataTypes.STRING
    },
    soDienThoai: {
        type: DataTypes.STRING,
        unique: true
    },
    tenChuCuaHang: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'CuaHang',
    timestamps: false
});

CuaHang.hasMany(DiaChi, { foreignKey: 'maCuaHang' });
DiaChi.belongsTo(CuaHang, { foreignKey: 'maCuaHang' });

module.exports = CuaHang;