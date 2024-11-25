import React from "react";
import { Formik, Form, Field } from "formik";
import { updateDoiTac } from "../services/fetchAPI";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getFromSession } from "../services/session";

const GDSuaTTDoiTac = () => {
  const doiTac = getFromSession("doiTac");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await updateDoiTac(doiTac.id, values);
      navigate("/GDQLTTDoiTac");
    } catch (error) {
      console.error("Cập nhật thất bại");
    }
  };

  return (
    <Formik initialValues={doiTac} onSubmit={handleSubmit}>
      {({ values, handleChange, handleBlur }) => (
        <Box
          sx={{
            maxWidth: 500,
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

          <Form>
            <TextField
              fullWidth
              label="Tên đối tác"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              sx={{ mb: 3 }}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sửa
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default GDSuaTTDoiTac;
