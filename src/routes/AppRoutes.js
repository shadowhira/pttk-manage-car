import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GDDangNhap from "../components/GDDangNhap";
import GDQuanLy from "../components/GDQuanLy";
import GDQLTTDoiTac from "../components/GDQLTTDoiTac";
import GDSuaTTDoiTac from "../components/GDSuaTTDoiTac";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/GDDangNhap" />} />
      <Route path="/GDDangNhap" element={<GDDangNhap />} />
      <Route path="/GDQuanLy" element={<GDQuanLy />} />
      <Route path="/GDQLTTDoiTac" element={<GDQLTTDoiTac />} />
      <Route path="/GDSuaTTDoiTac" element={<GDSuaTTDoiTac />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
