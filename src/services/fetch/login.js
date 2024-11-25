// src/fetch/login.js

export const login = async (username, password) => {
  try {
    const response = await fetch("http://localhost:5000/thanhvien/kiemTraDangNhap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    return { data, ok: response.ok };
  } catch (error) {
    console.error("Error during login:", error);
    return { data: null, ok: false };
  }
};
