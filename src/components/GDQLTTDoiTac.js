import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { findDoiTacByName, getDoiTac } from "../services/fetchAPI";
import { getFromSession, saveToSession } from "../services/session";

const GDQLTTDoiTac = () => {
  const [doiTacs, setDoiTacs] = useState(getFromSession("partners") || []);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const TTQuanLy = getFromSession("TTQuanLy");

  const handleSearch = async () => {
    try {
      const response = await findDoiTacByName(searchTerm);
      setDoiTacs(response.doiTacs);
      saveToSession("DSDoiTac", response.doiTacs);
    } catch (error) {
      toast.error("Không tìm thấy tên đối tác trong danh sách đối tác");
    }
  };

  const handleEdit = async (id) => {
    try {
      const doiTac = await getDoiTac(id);
      saveToSession("doiTac", doiTac.doiTac);
      navigate(`/GDSuaTTDoiTac/${id}`);
    } catch (error) {
      toast.error("Không thể tải thông tin đối tác");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // height: "100vh",
        p: 3,
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        Xin chào, {TTQuanLy.ten}
      </Typography>
      <Box
        sx={{
          maxWidth: 1600,
          mx: "auto",
          mt: 4,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
          Quản lý thông tin đối tác
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Tìm kiếm đối tác"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ whiteSpace: "nowrap" }}
          >
            Tìm kiếm
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên đối tác</TableCell>
                <TableCell>Số CMND</TableCell>
                <TableCell>SĐT</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số tài khoản</TableCell>
                <TableCell>Tên ngân hàng</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doiTacs.map((doiTac, stt) => (
                <TableRow key={doiTac.maDoiTac}>
                  <TableCell>{stt + 1}</TableCell>
                  <TableCell>{doiTac.ThanhVien?.ten}</TableCell>
                  <TableCell>{doiTac.soCMND}</TableCell>
                  <TableCell>{doiTac.ThanhVien?.soDienThoai}</TableCell>
                  <TableCell>{doiTac.ThanhVien?.email}</TableCell>
                  <TableCell>{doiTac.soTaiKhoan}</TableCell>
                  <TableCell>{doiTac.tenNganHang}</TableCell>
                  <TableCell>
                    {doiTac.ThanhVien?.DiaChi?.map((diaChi, i) => (
                      <div key={i}>
                        Địa chỉ {i + 1}: {diaChi.thonXom}, {diaChi.quanHuyen},{" "}
                        {diaChi.tinhThanhPho}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleEdit(doiTac.maDoiTac)}
                    >
                      Sửa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default GDQLTTDoiTac;
