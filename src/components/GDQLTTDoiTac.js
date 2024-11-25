import React, { useState } from "react";
import { getFromSession, saveToSession } from "../services/session";
import { findDoiTacByName } from "../services/fetchAPI";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";

const GDQLTTDoiTac = () => {
  const [doiTacs, setDoiTacs] = useState(getFromSession("partners") || []);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await findDoiTacByName(searchTerm);
      setDoiTacs(response.data);
      saveToSession("DSDoiTac", response.data);
    } catch (error) {
      console.error("Tìm kiếm thất bại");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
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

      <List>
        {doiTacs.map((doiTac) => (
          <ListItem
            key={doiTac.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              p: 2,
              border: "1px solid #ccc",
              borderRadius: 1,
            }}
          >
            <Typography variant="body1">{doiTac.name}</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(`/GDSuaTTDoiTac?id=${doiTac.id}`)}
            >
              Sửa
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GDQLTTDoiTac;
