const express = require("express");
const bodyParser = require("body-parser");
const Router = require("./router/index");

const cors = require("cors");

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/", Router);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
