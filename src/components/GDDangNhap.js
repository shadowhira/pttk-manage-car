import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { saveToSession } from "../services/session";
import { kiemTraDangNhap } from "../services/fetchAPI";
import { toast } from "react-toastify";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GDDangNhap = () => {
  const navigate = useNavigate();
  const initialValues = { username: "", password: "" };
  const validationSchema = Yup.object({
    username: Yup.string().required("Vui lòng nhập tên đăng nhập"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await kiemTraDangNhap(values.username, values.password);
      saveToSession("TTQuanLy", response.user);
      toast.success("Đăng nhập thành công!");
      navigate("/GDQuanLy");
    } catch (error) {
      toast.error("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleChange }) => (
        <Box
          component={Form}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            maxWidth: 400,
            margin: "auto",
            mt: 5,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Đăng nhập
          </Typography>

          <TextField
            name="username"
            label="Tên đăng nhập"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            name="password"
            label="Mật khẩu"
            type="password"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Đăng nhập
          </Button>
        </Box>
      )}
    </Formik>
  );
};

export default GDDangNhap;
