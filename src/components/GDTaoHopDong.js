import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Box, Paper } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createHopDong } from "../services/fetchAPI";

const HopDongForm = () => {
  const navigate = useNavigate();

  const doiTac = JSON.parse(sessionStorage.getItem("doiTac")) || {};

  const [hopDong, setHopDong] = useState({
    ngayKy: new Date().toISOString().split("T")[0],
    cuaHang: {
      tenCuaHang: "",
      soDienThoai: "",
      tenChuCuaHang: "",
      diaChi: [{ soNha: "", thonXom: "", quanHuyen: "", tinhThanhPho: "" }],
    },
    xeChoThue: [{ bienSo: "", namSanXuat: "", ngayNhanXe: "", ngayTraXe: "", giaThue: "" }],
    loiHong: [{ tenLoi: "", moTa: "" }],
  });

  const handleChange = (field, value, path) => {
    if (path) {
      const [mainField, index, subField] = path.split(".");
      const updatedField = [...hopDong[mainField]];
      updatedField[index][subField] = value;
      setHopDong((prev) => ({ ...prev, [mainField]: updatedField }));
    } else {
      setHopDong((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleAddField = (field) => {
    const defaultValues = {
      cuaHang: { soNha: "", thonXom: "", quanHuyen: "", tinhThanhPho: "" },
      xeChoThue: [{ bienSo: "", namSanXuat: "", ngayNhanXe: "", ngayTraXe: "", giaThue: "" }],
      loiHong: [{ tenLoi: "", moTa: "" }],
    };
    setHopDong((prev) => ({
      ...prev,
      [field]: [...prev[field], defaultValues[field]],
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await createHopDong(hopDong);
      if (response.success) {
        toast.success("Tạo hợp đồng thành công!");
        navigate("/GDThemMoiHopDong");
      } else {
        toast.error("Lỗi khi tạo hợp đồng!");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("Lỗi khi kết nối tới server!");
    }
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 1200, margin: "auto" }}>
      <Typography variant="h4" gutterBottom align="center">
        HỢP ĐỒNG CHO THUÊ LẠI XE
      </Typography>

      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "16px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Ngày ký hợp đồng: {hopDong.ngayKy}
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h5" gutterBottom>
                Thông tin bên A (Bên cho thuê lại xe)
              </Typography>
              <Box>
                <TextField
                  label="Tên đối tác"
                  value={doiTac.ThanhVien.ten || ""}
                  fullWidth
                  margin="normal"
                  disabled
                />
                <TextField
                  label="Địa chỉ"
                  value={
                    doiTac.ThanhVien.DiaChi.map(
                      (diaChi) =>
                        `${diaChi.soNha}, ${diaChi.thonXom}, ${diaChi.quanHuyen}, ${diaChi.tinhThanhPho}`
                    ) || ""
                  }
                  fullWidth
                  margin="normal"
                  disabled
                />
                <TextField
                  label="Email"
                  value={doiTac.ThanhVien.email || ""}
                  fullWidth
                  margin="normal"
                  disabled
                />
                <TextField
                  label="Căn cước công dân"
                  value={doiTac.soCMND || ""}
                  fullWidth
                  margin="normal"
                  disabled
                />
              </Box>
              <Typography variant="h5" gutterBottom>
                Thông tin thanh toán
              </Typography>
              <Box>
                <TextField
                  label="Hình thức thanh toán"
                  value="Chuyển khoản ngân hàng"
                  fullWidth
                  margin="normal"
                  disabled
                />
                <TextField
                  label="Tên ngân hàng"
                  value={doiTac.tenNganHang || ""}
                  fullWidth
                  margin="normal"
                  disabled
                />
                <TextField
                  label="Số tài khoản"
                  value={doiTac.soTaiKhoan || ""}
                  fullWidth
                  margin="normal"
                  disabled
                />
              </Box>

              <Typography variant="h5" sx={{ mt: 3 }}>
                Thông tin lỗi hỏng
              </Typography>
              {hopDong.loiHong.map((loi, index) => (
                <Box key={index} sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle1">Lỗi {index + 1}</Typography>
                  <Grid container spacing={2}>
                    {["tenLoi", "moTa"].map((field) => (
                      <Grid item xs={6} key={field}>
                        <TextField
                          label={field}
                          value={loi[field] || ""}
                          fullWidth
                          onChange={(e) =>
                            handleChange(
                              "loiHong",
                              e.target.value,
                              `loiHong.${index}.${field}`
                            )
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
              <Button
                variant="contained"
                onClick={() => handleAddField("loiHong")}
              >
                Thêm lỗi hỏng
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h5" gutterBottom>
                Thông tin bên B (Bên thuê lại xe)
              </Typography>
              <TextField
                label="Tên cửa hàng"
                value={hopDong.cuaHang.tenCuaHang}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  handleChange("cuaHang.tenCuaHang", e.target.value)
                }
              />
              <TextField
                label="Số điện thoại"
                value={hopDong.cuaHang.soDienThoai}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  handleChange("cuaHang.soDienThoai", e.target.value)
                }
              />
              <TextField
                label="Tên chủ cửa hàng"
                value={hopDong.cuaHang.tenChuCuaHang}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  handleChange("cuaHang.tenChuCuaHang", e.target.value)
                }
              />
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Địa chỉ
              </Typography>
              {hopDong.cuaHang.diaChi.map((address, index) => (
                <Box key={index} sx={{ marginBottom: 2 }}>
                  <Grid container spacing={2}>
                    {["soNha", "thonXom", "quanHuyen", "tinhThanhPho"].map(
                      (field) => (
                        <Grid item xs={3} key={field}>
                          <TextField
                            label={field}
                            value={address[field] || ""}
                            fullWidth
                            onChange={(e) =>
                              handleChange(
                                "cuaHang.diaChi",
                                e.target.value,
                                `diaChi.${index}.${field}`
                              )
                            }
                          />
                        </Grid>
                      )
                    )}
                  </Grid>
                </Box>
              ))}
              <Button
                variant="contained"
                onClick={() => handleAddField("cuaHang.diaChi")}
              >
                Thêm địa chỉ
              </Button>
              <Typography variant="h5" sx={{ mt: 3 }}>
                Thông tin xe thuê
              </Typography>
              {hopDong.xeChoThue.map((xe, index) => (
                <Box key={index} sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle1">Xe {index + 1}</Typography>
                  <Grid container spacing={2}>
                    {[
                      "bienSo",
                      "namSanXuat",
                      "ngayNhanXe",
                      "ngayTraXe",
                      "giaThue",
                    ].map((field) => (
                      <Grid item xs={6} key={field}>
                        <TextField
                          label={field}
                          value={xe[field] || ""}
                          fullWidth
                          onChange={(e) =>
                            handleChange(
                              "xeChoThue",
                              e.target.value,
                              `xeChoThue.${index}.${field}`
                            )
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
              <Button
                variant="contained"
                onClick={() => handleAddField("xeChoThue")}
              >
                Thêm xe
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/GDThemMoiHopDong")}
        >
          Đóng
        </Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Tạo Hợp Đồng
        </Button>
      </Box>
    </Paper>
  );
};

export default HopDongForm;
