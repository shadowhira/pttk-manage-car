const ThanhVien = require("../model/ThanhVien");
class ThanhVienDAO {
  constructor() {}

  async kiemtraDangnhap(username, password) {
    try {
      if (!username || !password) {
        throw new Error("Username hoặc password không được để trống");
      }

      const thanhvien = await ThanhVien.findOne({
        where: {
          taiKhoan: username,
          matKhau: password,
        },
        attributes: ["maThanhVien", "ten", "taiKhoan", "soDienThoai", "email"],
      });

      if (!thanhvien) {
        return null;
      }

      return thanhvien.toJSON();
    } catch (error) {
      console.error("Lỗi trong kiemtraDangnhap:", error);
      return null;
    }
  }
}

module.exports = ThanhVienDAO;
