const DAO = require("../dao/DAO");
const dao = new DAO();
const sequelize = dao.getSequelize();

module.exports = { sequelize };
