const mysql = require("mysql2");

class DAO {
  static connection = null;

  constructor() {
    if (!DAO.connection) {
      // Tạo pool kết nối
      DAO.connection = mysql
        .createPool({
          host: "localhost",
          user: "root",
          password: "G@con123",
          database: "pttk-car",
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        })
        .promise();

      // Log thông báo khi kết nối pool được tạo thành công
      DAO.connection.getConnection()
        .then(() => {
          console.log("Kết nối đến MySQL thành công.");
        })
        .catch((err) => {
          console.error("Lỗi khi kết nối tới MySQL:", err);
        });
    }
  }

  // Hàm trả về kết nối pool
  getConnection() {
    return DAO.connection;
  }
}

module.exports = DAO;
