const DoiTac = require("../model/DoiTac");
const ThanhVien = require("../model/ThanhVien");
const DiaChi = require("../model/DiaChi");
const Sequelize = require("sequelize");

class DoiTacDAO {
  constructor() {}

  async findDoiTacByName(name) {
    try {
      if (!name) {
        throw new Error("Tên không được để trống");
      }

      const doiTacs = await DoiTac.findAll({
        include: {
          model: ThanhVien,
          as: "ThanhVien",
          where: {
            ten: name,
          },
          include: {
            model: DiaChi,
            as: "DiaChi",
            attributes: ["maDiaChi", "soNha", "thonXom", "quanHuyen", "tinhThanhPho"],
          },
        },
      });

      if (doiTacs.length === 0) {
        return null;
      }

      return doiTacs.map((doiTac) => doiTac.toJSON());
    } catch (error) {
      console.error("Lỗi trong findDoiTacByName:", error);
      return null;
    }
  }

  async getDoiTac(maDoiTac) {
    try {
      if (!maDoiTac) {
        throw new Error("Mã đối tác không được để trống");
      }

      const doiTac = await DoiTac.findOne({
        where: {
          maDoiTac: maDoiTac,
        },
        attributes: ["maDoiTac", "soCMND", "soTaiKhoan", "tenNganHang"],
        include: [
          {
            model: ThanhVien,
            attributes: ["ten", "email", "soDienThoai"],
            include: [
              {
                model: DiaChi,
                as: "DiaChi",
                attributes: [
                  "maDiaChi",
                  "soNha",
                  "thonXom",
                  "quanHuyen",
                  "tinhThanhPho",
                ],
              },
            ],
          },
        ],
      });

      if (!doiTac) {
        return null;
      }

      return doiTac.toJSON();
    } catch (error) {
      console.error("Lỗi trong getDoiTac:", error);
      return null;
    }
  }

  async updateDoiTac(maDoiTac, data) {
    try {
      if (!maDoiTac || !data) {
        throw new Error("Mã đối tác và dữ liệu cập nhật không được để trống");
      }

      const doiTac = await DoiTac.findOne({
        where: { maDoiTac },
        include: [
          {
            model: ThanhVien,
            as: "ThanhVien",
            required: false,
            include: [
              {
                model: DiaChi,
                as: "DiaChi",
                required: false,
              },
            ],
          },
        ],
      });

      if (!doiTac) {
        throw new Error("Không tìm thấy đối tác để cập nhật");
      }

      await doiTac.update(
        {
          soCMND: data.soCMND,
          soTaiKhoan: data.soTaiKhoan,
          tenNganHang: data.tenNganHang,

          where: { maDoiTac },
        },
        { fields: ["soCMND", "soTaiKhoan", "tenNganHang"] }
      );

      if (data.ThanhVien) {
        await doiTac.ThanhVien.update({
          ten: data.ThanhVien.ten,
          soDienThoai: data.ThanhVien.soDienThoai,
          email: data.ThanhVien.email,
        });
      }

      for (const diaChi of data.ThanhVien.DiaChi) {
        if (!diaChi.maDiaChi) continue;
        const existingDiaChi = await DiaChi.findByPk(diaChi.maDiaChi);
        await existingDiaChi.update({
          soNha: diaChi.soNha,
          thonXom: diaChi.thonXom,
          quanHuyen: diaChi.quanHuyen,
          tinhThanhPho: diaChi.tinhThanhPho,
        });
      }

      return doiTac.toJSON();
    } catch (error) {
      console.error("Lỗi trong updateDoiTac:", error);
      return null;
    }
  }
}

module.exports = DoiTacDAO;
