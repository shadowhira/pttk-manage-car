const express = require("express");
const thanhVienRouter = require("./ThanhVienRouter");

const Router = express.Router();

Router.use("/thanhvien", thanhVienRouter);

module.exports = Router;