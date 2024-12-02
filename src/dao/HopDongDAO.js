const HopDong = require("../model/HopDong");
const XeChoThue = require("../model/XeChoThue");
const LoiHong = require("../model/LoiHong");
const CuaHang = require("../model/CuaHang");
const XeOTo = require("../model/XeOTo");


class HopDongDAO {
  async createHopDong(
    xeOToInfo,
    xeChoThueInfo,
    loiHongInfo,
    cuaHangInfo,
    hopDongInfo
  ) {
    const sequelize = require("sequelize");
    const transaction = await sequelize.transaction(); // Start a transaction

    try {
      // 1. Create CuaHang
      const cuaHang = await CuaHang.create(cuaHangInfo, { transaction });

      // 2. Create XeOTo (Map each XeOTo info from xeOToInfo)
      const xeOToArray = await Promise.all(
        xeOToInfo.map(async (xeOToItem) => {
          const xeOTo = await XeOTo.create(
            {
              bienSo: xeOToItem.bienSo,
              namSanXuat: xeOToItem.namSanXuat,
              maLoaiXe: xeOToItem.maLoaiXe, // Assuming maLoaiXe is part of xeOToItem
            },
            { transaction }
          );
          return xeOTo;
        })
      );

      // 3. Create LoiHong (Map each LoiHong info from loiHongInfo)
      const loiHongArray = await Promise.all(
        loiHongInfo.map(async (loiHongItem) => {
          const loiHong = await LoiHong.create(
            {
              tenLoi: loiHongItem.tenLoi,
              moTa: loiHongItem.moTa,
            },
            { transaction }
          );
          return loiHong;
        })
      );

      // 4. Create HopDong
      const hopDong = await HopDong.create(
        {
          ngayKy: hopDongInfo.ngayKy,
          ngayBatDau: hopDongInfo.ngayBatDau,
          ngayKetThuc: hopDongInfo.ngayKetThuc,
          giaTriHopDong: hopDongInfo.giaTriHopDong,
          tinhTrang: hopDongInfo.tinhTrang, // assuming 0 means active
          maNVQLDoiTac: hopDongInfo.maNVQLDoiTac, // Assuming this is provided
          maDoiTac: hopDongInfo.maDoiTac, // Assuming this is provided
        },
        { transaction }
      );

      // 5. Link XeOTo to HopDong
      // For each xeChoThueInfo, link it to the respective XeOTo and HopDong
      await Promise.all(
        xeChoThueInfo.map(async (xeChoThueItem, index) => {
          await XeChoThue.create(
            {
              ngayNhanXe: xeChoThueItem.ngayNhanXe,
              ngayTraXe: xeChoThueItem.ngayTraXe,
              giaThue: xeChoThueItem.giaThue,
              maXeOTo: xeOToArray[index].id, // Link to XeOTo
              maHopDong: hopDong.id, // Link to HopDong
            },
            { transaction }
          );
        })
      );

      // 6. Link LoiHong to XeChoThue
      await Promise.all(
        loiHongArray.map(async (loiHongItem) => {
          await LoiHongXeThue.create(
            {
              maLoiHong: loiHongItem.id, // Link to LoiHong
              maXeChoThue: xeChoThueInfo[0].id, // Assuming one XeChoThue
            },
            { transaction }
          );
        })
      );

      // Commit the transaction
      await transaction.commit();

      return hopDong;
    } catch (error) {
      // Rollback the transaction if an error occurs
      await transaction.rollback();
      console.error("Lỗi createHopDong:", error);
      throw error;
    }
  }
}

module.exports = HopDongDAO;
