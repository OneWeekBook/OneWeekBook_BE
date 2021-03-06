const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./models");
const indexRouter = require("./routes");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

(async () => {
  await db.sequelize.sync({ force: false });
  console.log("MariaDB Sync 완료!");
})();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use("/", indexRouter);
app.use((req, res, next) => {
  return res.status(404).json({
    message: "요청하신 페이지를 찾을 수 없습니다.",
    success: false,
  });
});
const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`${port}server on...`);
});
