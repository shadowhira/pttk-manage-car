import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { getFromSession, saveToSession } from "../services/session";
import { updateDoiTac } from "../services/fetchAPI";
import { toast } from "react-toastify";

const GDSuaTTDoiTac = () => {
  const doiTacData = getFromSession("doiTac");
  const { id } = useParams();
  const navigate = useNavigate();
  const [doiTac, setDoiTac] = useState(doiTacData || {});
  const [diaChis, setDiaChis] = useState(doiTacData?.ThanhVien?.DiaChi || []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Kiểm tra nếu trường thuộc về ThanhVien
    if (name in doiTac.ThanhVien) {
      // Cập nhật trường trong ThanhVien
      setDoiTac((prev) => ({
        ...prev,
        ThanhVien: {
          ...prev.ThanhVien,
          [name]: value,
        },
      }));
    } else {
      // Cập nhật các trường ngoài ThanhVien (soCMND, soTaiKhoan, tenNganHang)
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

  const handleSubmit = async () => {
    try {
      const updatedDoiTac = {
        ...doiTac,
        diaChis,
      };
      await updateDoiTac(id, updatedDoiTac);
      toast.success("Cập nhật thông tin đối tác thành công!");
      saveToSession("doiTac", updatedDoiTac);
      navigate("/GDQLTTDoiTac");
    } catch (error) {
      toast.error("Cập nhật thông tin thất bại.");
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
        Sửa thông tin đối tác
      </Typography>

      <TextField
        fullWidth
        label="Tên đối tác"
        name="ten"
        value={doiTac?.ThanhVien?.ten || ""}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Số CMND"
        name="soCMND"
        value={doiTac.soCMND || ""}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="SĐT"
        name="soDienThoai"
        value={doiTac?.ThanhVien?.soDienThoai || ""}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="email"
        name="email"
        value={doiTac?.ThanhVien?.email || ""}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Số tài khoản"
        name="soTaiKhoan"
        value={doiTac.soTaiKhoan || ""}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Tên ngân hàng"
        name="tenNganHang"
        value={doiTac.tenNganHang || ""}
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
          onClick={() => navigate("/GDQLTTDoiTac")}
        >
          Đóng
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Lưu
        </Button>
      </Box>
    </Box>
  );
};

export default GDSuaTTDoiTac;
