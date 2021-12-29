const express = require("express");
const app = express();
const db = require("./models");
const indexRouter = require("./routes");
require("dotenv").config();
db.sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.use((req, res, next) => {
  res.status(404).send("요청하신 페이지를 찾을 수 없습니다.");
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("서버 에러!");
});

const port = process.env.PORT;

app.listen(port || 4040, () => {
  console.log(`${port}server on...`);
});
