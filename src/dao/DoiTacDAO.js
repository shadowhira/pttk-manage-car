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

  async createDoiTac(data) {
    const { ThanhVien: thanhVienData, diaChis, ...doiTacInfo } = data;
    console.log('data: ', data);
  
    try {
      const doiTac = await DoiTac.create(doiTacInfo);
      console.log('doiTac: ', doiTac);
  
      if (thanhVienData) {
        const thanhVien = await ThanhVien.create({
          ...thanhVienData,
          maDoiTac: doiTac.maDoiTac,
        });
        console.log('thanhVien: ', thanhVien);
  
        if (diaChis && Array.isArray(diaChis)) {
          for (const diaChi of diaChis) {
            console.log('diaChi: ', diaChi);
            await DiaChi.create({
              ...diaChi,
              maThanhVien: thanhVien.maThanhVien,
            });
          }
        }
      }
  
      return doiTac.toJSON();
    } catch (error) {
      console.error("Lỗi trong createDoiTac:", error);
      throw new Error("Không thể tạo mới đối tác");
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
}

module.exports = DoiTacDAO;
