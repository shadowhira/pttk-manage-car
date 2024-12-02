import React from "react";
import { getFromSession } from "../services/session";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const GDQuanLy = () => {
  const TTQuanLy = getFromSession("TTQuanLy");
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        p: 3,
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        Xin chào, {TTQuanLy.ten}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/GDQLTTDoiTac")}
        sx={{ width: "300px", fontSize: "16px", py: 1.5 }}
      >
        Quản lý thông tin đối tác
      </Button>
    </Box>
  );
};

export default GDQuanLy;
