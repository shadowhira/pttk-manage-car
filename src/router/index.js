const express = require("express");
const thanhVienRouter = require("./ThanhVienRouter");
const doiTacRouter = require("./DoiTacRouter");
const hopDongRouter = require("./HopDongRouter");

const Router = express.Router();

Router.use("/thanhvien", thanhVienRouter);
Router.use("/doitac", doiTacRouter);
Router.use("/hopdong", hopDongRouter);

module.exports = Router;