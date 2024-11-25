class Thanhvien {
  constructor(id = null, username = "", password = "") {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getUsername() {
    return this.username;
  }

  setUsername(username) {
    this.username = username;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password) {
    this.password = password;
  }
}

module.exports = Thanhvien;
