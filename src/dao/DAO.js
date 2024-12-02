const { Sequelize } = require("sequelize");
class DAO {
  static sequelize = null;

  constructor() {
    if (!DAO.sequelize) {
      DAO.sequelize = new Sequelize("pttk-car", "root", "G@con123", {
        host: "localhost",
        dialect: "mysql",
        logging: false,
      });

      DAO.sequelize
        .authenticate()
        .then(() => {
          console.log("Kết nối đến MySQL thành công qua Sequelize.");
        })
        .catch((err) => {
          console.error("Lỗi khi kết nối tới MySQL qua Sequelize:", err);
        });
    }
  }

  getSequelize() {
    return DAO.sequelize;
  }
}

module.exports = DAO;
