const express = require("express");
const ThanhvienDAO = require("../dao/ThanhvienDAO");

const router = express.Router();
const thanhvienDAO = new ThanhvienDAO();

router.post("/kiemTraDangNhap", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await thanhvienDAO.kiemtraDangnhap(username, password);
    
    if (result) {
      // Nếu người dùng tồn tại, đăng nhập thành công
      res.status(200).json({ success: true, user: result });
    } else {
      // Nếu không có người dùng phù hợp
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    // Nếu có lỗi trong quá trình xử lý
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
