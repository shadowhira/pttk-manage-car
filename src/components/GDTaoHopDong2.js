import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RentalContractForm = () => {
  const [formData, setFormData] = useState({
    contractId: "",
    signingDate: "",
    lessor: { name: "", address: "", phone: "", email: "", idCard: "" },
    lessee: { storeName: "", representative: "", address: "", phone: "" },
    carInfo: [{ type: "", plate: "", manufacturer: "", fee: "" }],
    damages: [],
    payment: { bankName: "", accountNumber: "", branch: "" },
    purpose: "",
  });

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleAddCar = () => {
    setFormData((prev) => ({
      ...prev,
      carInfo: [
        ...prev.carInfo,
        { type: "", plate: "", manufacturer: "", fee: "" },
      ],
    }));
  };

  const handleAddDamage = () => {
    setFormData((prev) => ({
      ...prev,
      damages: [...prev.damages, { id: prev.damages.length + 1, name: "" }],
    }));
  };

  const handleSubmit = () => {
    toast.success("Hợp đồng đã được tạo thành công!");
    console.log(formData);
  };

  return (
    <Box sx={{ p: 4 }}>
      <ToastContainer />
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}
      >
        HỢP ĐỒNG CHO THUÊ LẠI XE Ô TÔ
      </Typography>

      <Grid container spacing={4}>
        {/* Column 1 */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Bên A (Bên cho thuê lại xe)
          </Typography>
          <TextField
            label="Tên"
            value={formData.lessor.name}
            onChange={(e) =>
              handleInputChange("lessor", "name", e.target.value)
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Địa chỉ"
            value={formData.lessor.address}
            onChange={(e) =>
              handleInputChange("lessor", "address", e.target.value)
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Số điện thoại"
            value={formData.lessor.phone}
            onChange={(e) =>
              handleInputChange("lessor", "phone", e.target.value)
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            value={formData.lessor.email}
            onChange={(e) =>
              handleInputChange("lessor", "email", e.target.value)
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Căn cước công dân"
            value={formData.lessor.idCard}
            onChange={(e) =>
              handleInputChange("lessor", "idCard", e.target.value)
            }
            fullWidth
            sx={{ mb: 2 }}
          />

          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Phương thức thanh toán
          </Typography>
          <TextField
            label="Tên ngân hàng"
            value={formData.payment.bankName}
            onChange={(e) =>
              handleInputChange("payment", "bankName", e.target.value)
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Số tài khoản"
            value={formData.payment.accountNumber}
            onChange={(e) =>
              handleInputChange("payment", "accountNumber", e.target.value)
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Chi nhánh"
            value={formData.payment.branch}
            onChange={(e) =>
              handleInputChange("payment", "branch", e.target.value)
            }
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>

        {/* Column 2 */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Bên B (Bên thuê lại xe)
          </Typography>
          <TextField
            label="Tên cửa hàng"
            value={formData.lessee.storeName}
            onChange={(e) =>
              handleInputChange("lessee", "storeName", e.target.value)
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Người đại diện"
            value={formData.lessee.representative}
            onChange={(e) =>
              handleInputChange("lessee", "representative", e.target.value)
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Địa chỉ"
            value={formData.lessee.address}
            onChange={(e) =>
              handleInputChange("lessee", "address", e.target.value)
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Số điện thoại"
            value={formData.lessee.phone}
            onChange={(e) =>
              handleInputChange("lessee", "phone", e.target.value)
            }
            fullWidth
            sx={{ mb: 2 }}
          />

          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Thông tin xe thuê
          </Typography>
          {formData.carInfo.map((car, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <TextField
                label="Loại xe"
                value={car.type}
                onChange={(e) => {
                  const cars = [...formData.carInfo];
                  cars[index].type = e.target.value;
                  setFormData((prev) => ({ ...prev, carInfo: cars }));
                }}
                fullWidth
                sx={{ mb: 1 }}
              />
              <TextField
                label="Biển số"
                value={car.plate}
                onChange={(e) => {
                  const cars = [...formData.carInfo];
                  cars[index].plate = e.target.value;
                  setFormData((prev) => ({ ...prev, carInfo: cars }));
                }}
                fullWidth
                sx={{ mb: 1 }}
              />
              <TextField
                label="Hãng sản xuất"
                value={car.manufacturer}
                onChange={(e) => {
                  const cars = [...formData.carInfo];
                  cars[index].manufacturer = e.target.value;
                  setFormData((prev) => ({ ...prev, carInfo: cars }));
                }}
                fullWidth
                sx={{ mb: 1 }}
              />
              <TextField
                label="Phí thuê"
                value={car.fee}
                onChange={(e) => {
                  const cars = [...formData.carInfo];
                  cars[index].fee = e.target.value;
                  setFormData((prev) => ({ ...prev, carInfo: cars }));
                }}
                fullWidth
              />
            </Box>
          ))}
          <Button
            variant="contained"
            onClick={handleAddCar}
            sx={{ mt: 2, backgroundColor: "primary.main" }}
          >
            Thêm xe thuê
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Các lỗi hỏng sẵn
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Tên lỗi hỏng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formData.damages.map((damage, index) => (
            <TableRow key={index}>
              <TableCell>{damage.id}</TableCell>
              <TableCell>
                <TextField
                  value={damage.name}
                  onChange={(e) => {
                    const damages = [...formData.damages];
                    damages[index].name = e.target.value;
                    setFormData((prev) => ({ ...prev, damages }));
                  }}
                  fullWidth
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" onClick={handleAddDamage} sx={{ mt: 2 }}>
        Thêm lỗi hỏng
      </Button>

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 4, backgroundColor: "green" }}
      >
        Tạo hợp đồng
      </Button>
    </Box>
  );
};

export default RentalContractForm;
