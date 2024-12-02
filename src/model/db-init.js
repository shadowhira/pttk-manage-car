const ThanhVien = require('./ThanhVien');
const DiaChi = require('./DiaChi');
const DoiTac = require('./DoiTac');
const NhanVien = require('./NhanVien');
const NVQLDoiTac = require('./NVQLDoiTac');

const initializeDatabase = async () => {
  try {
    await ThanhVien.sync({ alter: true });
    await DiaChi.sync({ alter: true });
    await DoiTac.sync({ alter: true });
    await NhanVien.sync({ alter: true });
    await NVQLDoiTac.sync({ alter: true });

    console.log('Database đã được đồng bộ');
  } catch (error) {
    console.error('Lỗi đồng bộ database:', error);
  }
};

module.exports = { initializeDatabase };
