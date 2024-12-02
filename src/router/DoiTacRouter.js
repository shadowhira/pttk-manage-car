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
      // Nếu tìm thấy đối tác
      res.status(200).json({ success: true, doiTacs: result });
    } else {
      // Nếu không tìm thấy đối tác
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

    // Lấy thông tin đối tác theo ID
    const result = await doiTacDAO.getDoiTac(id);

    if (result) {
      // Nếu tìm thấy đối tác
      res.status(200).json({ success: true, doiTac: result });
    } else {
      // Nếu không tìm thấy đối tác
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { soCMND, soTaiKhoan, tenNganHang, ThanhVien } = req.body;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID đối tác không được để trống",
      });
    }

    // Kiểm tra nếu các trường cần thiết không được truyền vào
    if (!soCMND || !soTaiKhoan || !tenNganHang) {
      return res.status(400).json({
        success: false,
        message: "Cần truyền đầy đủ thông tin cập nhật cho đối tác",
      });
    }

    // Kiểm tra thông tin của ThanhVien nếu có
    if (ThanhVien) {
      const { ten, soDienThoai, email } = ThanhVien;
      if (!ten || !soDienThoai || !email) {
        return res.status(400).json({
          success: false,
          message: "Cần truyền đầy đủ thông tin cập nhật cho ThanhVien",
        });
      }
    }

    // Cập nhật thông tin đối tác
    const updatedDoiTac = await doiTacDAO.updateDoiTac(id, {
      soCMND,
      soTaiKhoan,
      tenNganHang,
      ThanhVien, // Gửi dữ liệu về thông tin ThanhVien nếu có
    });

    if (updatedDoiTac) {
      // Nếu cập nhật thành công
      res.status(200).json({
        success: true,
        message: "Cập nhật đối tác thành công",
        doiTac: updatedDoiTac,
      });
    } else {
      // Nếu không có đối tác nào được cập nhật
      res.status(404).json({
        success: false,
        message: "Không tìm thấy đối tác với ID này để cập nhật",
      });
    }
  } catch (error) {
    console.error("Error in updateDoiTac:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
