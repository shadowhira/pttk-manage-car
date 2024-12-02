import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { saveToSession } from "../services/session";
import { createDoiTac } from "../services/fetchAPI"; // Đổi thành API thêm mới
import { toast } from "react-toastify";

const GDThemMoiDoiTac = () => {
  const navigate = useNavigate();
  const [doiTac, setDoiTac] = useState({
    ThanhVien: {
      ten: "",
      soDienThoai: "",
      email: "",
    },
    soCMND: "",
    soTaiKhoan: "",
    tenNganHang: "",
  });
  const [diaChis, setDiaChis] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in doiTac.ThanhVien) {
      setDoiTac((prev) => ({
        ...prev,
        ThanhVien: {
          ...prev.ThanhVien,
          [name]: value,
        },
      }));
    } else {
      setDoiTac((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...diaChis];
    updatedAddresses[index][field] = value;
    setDiaChis(updatedAddresses);
  };

  const handleAddAddress = () => {
    setDiaChis([
      ...diaChis,
      { soNha: "", thonXom: "", quanHuyen: "", tinhThanhPho: "" },
    ]);
  };

  const handleSubmit = async () => {
    try {
      const newDoiTac = { ...doiTac, diaChis };
      await createDoiTac(newDoiTac); 
      toast.success("Thêm mới đối tác thành công!");
      saveToSession("doiTac", newDoiTac);
      navigate("/GDThemMoiHopDong");
    } catch (error) {
      toast.error("Thêm mới đối tác thất bại.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
        Thêm mới đối tác
      </Typography>

      <TextField
        fullWidth
        label="Tên đối tác"
        name="ten"
        value={doiTac.ThanhVien.ten}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Số CMND"
        name="soCMND"
        value={doiTac.soCMND}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="SĐT"
        name="soDienThoai"
        value={doiTac.ThanhVien.soDienThoai}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={doiTac.ThanhVien.email}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Số tài khoản"
        name="soTaiKhoan"
        value={doiTac.soTaiKhoan}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Tên ngân hàng"
        name="tenNganHang"
        value={doiTac.tenNganHang}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <Typography variant="h6" sx={{ mt: 3 }}>
        Địa chỉ
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Số nhà</TableCell>
              <TableCell>Thôn xóm</TableCell>
              <TableCell>Quận huyện</TableCell>
              <TableCell>Tỉnh thành phố</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {diaChis.map((diaChi, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    value={diaChi.soNha}
                    onChange={(e) =>
                      handleAddressChange(index, "soNha", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={diaChi.thonXom}
                    onChange={(e) =>
                      handleAddressChange(index, "thonXom", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={diaChi.quanHuyen}
                    onChange={(e) =>
                      handleAddressChange(index, "quanHuyen", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={diaChi.tinhThanhPho}
                    onChange={(e) =>
                      handleAddressChange(index, "tinhThanhPho", e.target.value)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="text" onClick={handleAddAddress} sx={{ mt: 2 }}>
        Thêm địa chỉ
      </Button>

      <Box
        sx={{
          mt: 3,
          textAlign: "right",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/GDThemMoiHopDong")}
        >
          Đóng
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Thêm mới
        </Button>
      </Box>
    </Box>
  );
};

export default GDThemMoiDoiTac;
