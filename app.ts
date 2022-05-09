<<<<<<< HEAD:app.ts
import express, { Request, Response, NextFunction } from "express";
const app: express.Application = express();
import db from "./models";
import indexRouter from "./routes";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";
import { Env } from "./types";
=======
const express = require("express");
const app = express();
const db = require("./models");
const indexRouter = require("./routes");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
>>>>>>> 957033c197ed2d82cf1a393d2a79ae6b4fcda445:app.js

(async () => {
  await db.sequelize.sync();
  console.log("MariaDB Sync 완료!");
})();

app.use(helmet());
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
