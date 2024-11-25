// src/App.jsx
import React from 'react';
import { ToastContainer } from 'react-toastify';
import GDDangNhap from './GDDangNhap';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <div>
      <AppRoutes />
      <ToastContainer />
    </div>
  );
};

export default App;
