const express = require("express");
const HopDongDAO = require("../dao/HopDongDAO");
const router = express.Router();
const hopDongDAO = new HopDongDAO();

router.post("/", async (req, res) => {
  try {
    const { ngayKy, cuaHang, xeChoThue, loiHong } = req.body;

    const hopDongInfo = {
      ngayKy: new Date(ngayKy),
      ngayBatDau: new Date(),
      ngayKetThuc: new Date(),
      giaTriHopDong: 0,
      maNVQLDoiTac: 1,
      maDoiTac: 1,
    };

    const xeOToInfo = xeChoThue.map((xeChoThueItem) => ({
      bienSo: xeChoThueItem.bienSo,
      namSanXuat: xeChoThueItem.namSanXuat,
    }));

    const xeChoThueInfo = xeChoThue.map((xeChoThueItem) => ({
      ngayNhanXe: new Date(xeChoThueItem.ngayNhanXe),
      ngayTraXe: new Date(xeChoThueItem.ngayTraXe),
      giaThue: xeChoThueItem.giaThue,
    }));

    const loiHongInfo = loiHong.map((loiHongItem) => ({
      tenLoi: loiHongItem.tenLoi,
      moTa: loiHongItem.moTa,
    }));

    const cuaHangInfo = {
      tenCuaHang: cuaHang.tenCuaHang,
      soDienThoai: cuaHang.soDienThoai,
      tenChuCuaHang: cuaHang.tenChuCuaHang,
    };

    const hopDong = await hopDongDAO.createHopDong(
      xeOToInfo,
      xeChoThueInfo,
      loiHongInfo,
      cuaHangInfo,
      hopDongInfo
    );

    res.status(200).json({ message: "HopDong created successfully", hopDong });
  } catch (error) {
    console.error("Error creating HopDong:", error);
    res.status(500).json({ message: "Error creating HopDong", error });
  }
});

module.exports = router;
