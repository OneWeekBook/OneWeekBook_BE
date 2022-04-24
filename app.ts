// const express = require("express");
import express, { Request, Response, NextFunction } from "express";
const app: express.Application = express();
import db from "./models";
import indexRouter from "./routes";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";

(async () => {
  await db.sequelize.sync();
  console.log("MariaDB Sync 완료!");
})();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use("/", indexRouter);
app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    message: "요청하신 페이지를 찾을 수 없습니다.",
    success: false,
  });
});

const port: number = parseInt(process.env.PORT);

app.listen(port || 4040, () => {
  console.log(`${port}server on...`);
});
