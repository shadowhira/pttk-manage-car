import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GDDangNhap from "../components/GDDangNhap";
import GDQuanLy from "../components/GDQuanLy";
import GDThemMoiHopDong from "../components/GDThemMoiHopDong";
import GDThemMoiDoiTac from "../components/GDThemMoiDoiTac";
import GDTaoHopDong from "../components/GDTaoHopDong";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/GDDangNhap" />} />
      <Route path="/GDDangNhap" element={<GDDangNhap />} />
      <Route path="/GDQuanLy" element={<GDQuanLy />} />
      <Route path="/GDThemMoiHopDong" element={<GDThemMoiHopDong />} />
      <Route path="/GDTaoHopDong" element={<GDTaoHopDong />} />
      <Route path="/GDThemMoiDoiTac" element={<GDThemMoiDoiTac />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
