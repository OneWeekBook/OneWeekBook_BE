"use strict";

const { Sequelize, DataTypes, Op } = require("sequelize");
const config = require("../config");
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize; // app에서 sync해주기 위해서
db.Sequelize = Sequelize;
db.User = require("./user")(sequelize, DataTypes);
db.Category = require("./category")(sequelize, DataTypes);
db.Book = require("./book")(sequelize, DataTypes);
db.BookComment = require("./bookComment")(sequelize, DataTypes);
db.BookProgress = require("./bookProgress")(sequelize, DataTypes);
db.BookReview = require("./bookReview")(sequelize, DataTypes);

db.User.belongsToMany(db.Book, { through: "UserBook" });
db.Book.belongsToMany(db.User, { through: "UserBook" });

db.User.hasMany(db.BookReview, {
  foreignKey: "userId",
  sourceKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.Book.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });

db.Book.hasMany(db.BookReview, {
  foreignKey: "bookId",
  sourceKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.BookReview.belongsTo(db.Book, { foreignKey: "bookId", targetKey: "id" });

db.Book.hasMany(db.BookComment, {
  foreignKey: "bookId",
  sourceKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.BookComment.belongsTo(db.Book);

db.User.hasMany(db.BookReview, {
  foreignKey: "UserId",
  sourceKey: "id",
});
db.BookReview.belongsTo(db.User);

db.User.hasMany(db.BookComment, {
  foreignKey: "UserId",
  sourceKey: "id",
});
db.BookComment.belongsTo(db.User);

db.Op = Op;

module.exports = db;
