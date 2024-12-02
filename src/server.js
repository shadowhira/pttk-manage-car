const express = require("express");
const bodyParser = require("body-parser");
const Router = require("./router/index");
const { initializeDatabase } = require("./model/db-init");

const cors = require("cors");

(async () => {
  try {
    await initializeDatabase();
    console.log("Đồng bộ thành công!");
  } catch (err) {
    console.error("Lỗi đồng bộ:", err);
  }
})();

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.use(
  cors({
    origin: "http://localhost:2000",
  })
);

app.use("/", Router);

const PORT = 2001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});