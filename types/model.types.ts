import db from "../models";

export interface DBconfigType {
  username: string;
  password: string;
  database: string;
  [key: string]: string | number;
}

export type dbType = typeof db;
