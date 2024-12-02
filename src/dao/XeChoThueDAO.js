const { XeThue } = require("../model/XeChoThue"); // Import the XeThue model

class XeChoThueDAO {
  async createXeThue(xeThueData) {
    try {
      const xeThue = await XeThue.create(xeThueData);
      return xeThue;
    } catch (error) {
      console.error("Lỗi createXeThue:", error);
      return null;
    }
  }
}

module.exports = XeChoThueDAO;
