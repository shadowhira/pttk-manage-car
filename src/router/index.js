const express = require("express");
const thanhVienRouter = require("./ThanhVienRouter");
const doiTacRouter = require("./DoiTacRouter");

const Router = express.Router();

Router.use("/thanhvien", thanhVienRouter);
Router.use("/doitac", doiTacRouter);

module.exports = Router;