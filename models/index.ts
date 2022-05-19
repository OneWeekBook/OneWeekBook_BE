"use strict";

import { Sequelize, Op } from "sequelize";
import config from "../config";
import User from "./user";
import Category from "./category";
import UserBookList from "./userBookList";
import BookParagraph from "./bookParagraph";
import BookReviewLike from "./bookReviewLike";

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {
  sequelize,
  User,
  Category,
  UserBookList,
  BookParagraph,
  BookReviewLike,
  Op,
};

User.init(sequelize);
Category.init(sequelize);
UserBookList.init(sequelize);
BookParagraph.init(sequelize);
BookReviewLike.init(sequelize);

User.associate(db);
UserBookList.associate(db);
BookParagraph.associate(db);
BookReviewLike.associate(db);

export default db;
