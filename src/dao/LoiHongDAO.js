const { LoiHong } = require("../model/LoiHong"); // Assuming you have a LoiHong model defined in your models directory

class LoiHongDAO {
  async createLoiHong(loiHongData) {
    try {
      const loiHong = await LoiHong.create(loiHongData);
      return loiHong;
    } catch (error) {
      console.error("Lỗi createLoiHong:", error);
      return null;
    }
  }
}

module.exports = LoiHongDAO;
