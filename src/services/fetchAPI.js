const baseURL = "http://localhost:5000";

export const kiemTraDangNhap = async (username, password) => {
  const response = await fetch(`${baseURL}/thanhvien/kiemTraDangNhap`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const findDoiTacByName = async (name) => {
  const response = await fetch(`${baseURL}/doiTac/findDoiTacByName?search=${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const updateDoiTac = async (id, data) => {
  const response = await fetch(`${baseURL}/doiTac/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getDoiTac = async (id) => {
  const response = await fetch(`${baseURL}/doiTac/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};