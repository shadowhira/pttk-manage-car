const NhanVien = require("./NhanVien");
const CuaHang = require("./CuaHang");
const DiaChi = require("./DiaChi");
const DoiTac = require("./DoiTac");
const LoaiXe = require("./LoaiXe");
const NVQLDoiTac = require("./NVQLDoiTac");
const ThanhVien = require("./ThanhVien");
const XeOTo = require("./XeOTo");
const XeChoThue = require("./XeChoThue");
const LoiHong = require("./LoiHong");
const LoiHongXeThue = require("./LoiHongXeThue");
const HopDong = require("./HopDong");

const { sequelize } = require("../config/database");

const initializeDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });

    console.log("Database đã được đồng bộ");
  } catch (error) {
    console.error("Lỗi đồng bộ database:", error);
  }
};

module.exports = { initializeDatabase };
