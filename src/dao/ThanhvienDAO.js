const DAO = require("./DAO");
const Thanhvien = require("../model/ThanhVien");

class ThanhvienDAO extends DAO {
  constructor() {
    super();
  }

  async kiemtraDangnhap(username, password) {
    let result = null; // Khởi tạo lại để trả về null thay vì false khi không tìm thấy người dùng
    const query =
      "SELECT id, username, password FROM thanhvien WHERE username = ? AND password = ?";

    try {
      // Kiểm tra điều kiện đầu vào
      if (!username || !password) {
        throw new Error("Username or password is undefined");
      }

      // Tránh SQL injection
      if (
        username.includes("true") ||
        username.includes("=") ||
        password.includes("true") ||
        password.includes("=")
      ) {
        return null;
      }

      // Thực thi truy vấn
      const connection = await this.getConnection();
      const [rows] = await connection.execute(query, [username, password]);

      if (rows.length > 0) {
        const user = rows[0]; // Lấy người dùng đầu tiên từ kết quả
        const thanhvien = new Thanhvien();
        thanhvien.setId(user.id);
        thanhvien.setUsername(user.username);
        thanhvien.setPassword(user.password);

        result = thanhvien; // Trả về đối tượng người dùng nếu tìm thấy
      }
    } catch (error) {
      console.error("Error in kiemtraDangnhap:", error);
      result = null;
    }

    return result;
  }
}

module.exports = ThanhvienDAO;
