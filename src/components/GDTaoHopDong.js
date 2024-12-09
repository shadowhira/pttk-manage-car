import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Box, Paper } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createHopDong } from "../services/fetchAPI";
import { format, parse } from "date-fns"; // Dùng date-fns để xử lý ngày tháng

const HopDongForm = () => {
  const navigate = useNavigate();

  const doiTac = JSON.parse(sessionStorage.getItem("doiTac")) || {};

  const [hopDong, setHopDong] = useState({
    ngayKy: new Date().toISOString().split("T")[0],
    cuaHang: {
      tenCuaHang: "",
      soDienThoai: "",
      tenChuCuaHang: "",
    },
  });

  const [diaChi, setDiaChi] = useState([
    { soNha: "", thonXom: "", quanHuyen: "", tinhThanhPho: "" },
  ]);
  const [xeChoThue, setXeChoThue] = useState([
    { bienSo: "", namSanXuat: "", ngayNhanXe: "", ngayTraXe: "", giaThue: "" },
  ]);
  const [loiHong, setLoiHong] = useState([]);
  const [currentCarIndex, setCurrentCarIndex] = useState(1);
  const [currentLoiHongIndex, setCurrentLoiHongIndex] = useState(0);

  // Hàm để chuyển đổi ngày từ định dạng yyyy-MM-dd sang dd/MM/yyyy
  const formatDate = (date) => {
    if (!date) return "";
    return format(parse(date, "yyyy-MM-dd", new Date()), "dd/MM/yyyy");
  };

  const handleChangeDate = (index, field, value) => {
    // Chuyển đổi lại từ định dạng dd/MM/yyyy về yyyy-MM-dd trước khi lưu vào state hoặc gửi API
    const [day, month, year] = value.split("/");
    const formattedDate = `${year}-${month}-${day}`;
    handleXeChoThueChange(index, field, formattedDate);
  };

  const handleChange = (field, value, path) => {
    if (path) {
      const [mainField, index, subField] = path.split(".");
      setHopDong((prev) => {
        const updatedField = [...prev[mainField]];
        updatedField[index] = { ...updatedField[index], [subField]: value };
        return { ...prev, [mainField]: updatedField };
      });
    } else {
      const [mainField, subField] = field.split(".");
      if (subField) {
        setHopDong((prev) => ({
          ...prev,
          [mainField]: { ...prev[mainField], [subField]: value },
        }));
      } else {
        setHopDong((prev) => ({ ...prev, [field]: value }));
      }
    }
  };

  const handleDiaChiChange = (index, field, value) => {
    const updatedDiaChi = [...diaChi];
    updatedDiaChi[index][field] = value;
    setDiaChi(updatedDiaChi);
  };

  const handleAddDiaChi = () => {
    setDiaChi([
      ...diaChi,
      { soNha: "", thonXom: "", quanHuyen: "", tinhThanhPho: "" },
    ]);
  };

  const handleXeChoThueChange = (index, field, value) => {
    const updatedXeChoThue = [...xeChoThue];
    updatedXeChoThue[index][field] = value;
    setXeChoThue(updatedXeChoThue);
  };

  const handleAddXeChoThue = () => {
    setXeChoThue([
      ...xeChoThue,
      {
        bienSo: "",
        namSanXuat: "",
        ngayNhanXe: "",
        ngayTraXe: "",
        giaThue: "",
      },
    ]);
    setCurrentCarIndex(currentCarIndex + 1);
  };

  const handleLoiHongChange = (index, field, value) => {
    const updatedLoiHong = [...loiHong];
    updatedLoiHong[index][field] = value;
    setLoiHong(updatedLoiHong);
  };

  const handleAddLoiHong = () => {
    setCurrentLoiHongIndex(currentLoiHongIndex + 1);
    setLoiHong([...loiHong, { tenLoi: "", moTa: "" }]);
  };

  const handleSubmit = async () => {
    const hopDongToSubmit = {
      ...hopDong,
      cuaHang: {
        ...hopDong.cuaHang,
        diaChi,
      },
      xeChoThue,
      loiHong,
    };

    try {
      const response = await createHopDong(hopDongToSubmit);
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

              {currentCarIndex !== 0 && (
                <>
                  <Typography variant="h5" sx={{ mt: 3 }}>
                    Thông tin lỗi hỏng xe
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 3 }}>
                    Lỗi xe {currentCarIndex}
                  </Typography>
                  {loiHong.map((loi, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                      <Typography variant="subtitle1">
                        Lỗi {index + 1}
                      </Typography>
                      <Grid container spacing={2}>
                        {["tenLoi", "moTa"].map((field) => (
                          <Grid item xs={6} key={field}>
                            <TextField
                              label={field}
                              value={loi[field] || ""}
                              fullWidth
                              onChange={(e) =>
                                handleLoiHongChange(
                                  index,
                                  field,
                                  e.target.value
                                )
                              }
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  ))}
                  <Button variant="contained" onClick={handleAddLoiHong}>
                    Thêm lỗi hỏng
                  </Button>
                </>
              )}

              {currentCarIndex !== 1 && (
                <>
                  <Typography variant="h5" sx={{ mt: 3 }}>
                    Thông tin lỗi hỏng xe
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 3 }}>
                    Lỗi xe {currentCarIndex}
                  </Typography>
                  {loiHong.map((loi, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                      <Typography variant="subtitle1">
                        Lỗi {index + 1}
                      </Typography>
                      <Grid container spacing={2}>
                        {["tenLoi", "moTa"].map((field) => (
                          <Grid item xs={6} key={field}>
                            <TextField
                              label={field}
                              value={loi[field] || ""}
                              fullWidth
                              onChange={(e) =>
                                handleLoiHongChange(
                                  index,
                                  field,
                                  e.target.value
                                )
                              }
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  ))}
                  <Button variant="contained" onClick={handleAddLoiHong}>
                    Thêm lỗi hỏng
                  </Button>
                </>
              )}
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
              {diaChi.map((address, index) => (
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
                              handleDiaChiChange(index, field, e.target.value)
                            }
                          />
                        </Grid>
                      )
                    )}
                  </Grid>
                </Box>
              ))}
              <Button variant="contained" onClick={handleAddDiaChi}>
                Thêm địa chỉ
              </Button>
              <Typography variant="h5" sx={{ mt: 3 }}>
                Thông tin xe thuê
              </Typography>
              {xeChoThue.map((xe, index) => (
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
                            handleXeChoThueChange(index, field, e.target.value)
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
              <Button variant="contained" onClick={handleAddXeChoThue}>
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
