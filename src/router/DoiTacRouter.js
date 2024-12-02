const express = require("express");
const DoiTacDAO = require("../dao/DoiTacDAO");

const router = express.Router();
const doiTacDAO = new DoiTacDAO();

router.get("/findDoiTacByName", async (req, res) => {
  const { search: name } = req.query;

  try {
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Tên không được để trống",
      });
    }

    const result = await doiTacDAO.findDoiTacByName(name);

    if (result && result.length > 0) {
      res.status(200).json({ success: true, doiTacs: result });
    } else {
      res.status(404).json({
        success: false,
        message: "Không tìm thấy đối tác với tên này",
      });
    }
  } catch (error) {
    console.error("Error in findDoiTacByName:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID đối tác không được để trống",
      });
    }

    const result = await doiTacDAO.getDoiTac(id);

    if (result) {
      res.status(200).json({ success: true, doiTac: result });
    } else {
      res.status(404).json({
        success: false,
        message: "Không tìm thấy đối tác với ID này",
      });
    }
  } catch (error) {
    console.error("Error in getDoiTac:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const doiTac = await doiTacDAO.createDoiTac(req.body);
    res.status(201).json(doiTac);
  } catch (error) {
    console.error("Lỗi trong POST /doiTac:", error);
    res.status(500).json({ message: "Lỗi khi tạo đối tác", error: error.message });
  }
});

module.exports = router;
