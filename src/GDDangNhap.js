// src/components/Login.jsx
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
// import { useNavigate } from 'react-router-dom'; // Để điều hướng sau khi đăng nhập thành công
import { toast } from "react-toastify";
import { login } from "./services/fetch/login"; // Đường dẫn tới file login.js

// Đảm bảo bạn đã cài đặt toastify trong ứng dụng của mình
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);

    try {
      const {data: response} = await login(username, password);
      if (response.success) {
        toast.success("Đăng nhập thành công");
        // navigate('/dashboard'); // Điều hướng đến trang dashboard hoặc trang chính
      } else {
        toast.error(response.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4">Đăng nhập</Typography>
      <TextField
        label="Tên đăng nhập"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ width: 300 }}
      />
      <TextField
        label="Mật khẩu"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ width: 300 }}
      />
      <Button
        variant="contained"
        onClick={handleLogin}
        sx={{ width: 300 }}
        disabled={loading}
      >
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>
    </Box>
  );
};

export default Login;
