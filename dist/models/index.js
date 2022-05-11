"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const user_1 = __importDefault(require("./user"));
const category_1 = __importDefault(require("./category"));
const userBookList_1 = __importDefault(require("./userBookList"));
const bookParagraph_1 = __importDefault(require("./bookParagraph"));
const bookReview_1 = __importDefault(require("./bookReview"));
const bookReviewLike_1 = __importDefault(require("./bookReviewLike"));
const db = {};
const sequelize = new sequelize_1.Sequelize(config_1.default.database, config_1.default.username, config_1.default.password, config_1.default);
db.sequelize = sequelize; // app에서 sync해주기 위해서
db.Sequelize = sequelize_1.Sequelize;
db.User = (0, user_1.default)(sequelize, sequelize_1.DataTypes);
db.Category = (0, category_1.default)(sequelize, sequelize_1.DataTypes);
db.UserBookList = (0, userBookList_1.default)(sequelize, sequelize_1.DataTypes);
db.BookParagraph = (0, bookParagraph_1.default)(sequelize, sequelize_1.DataTypes);
db.BookReview = (0, bookReview_1.default)(sequelize, sequelize_1.DataTypes);
db.BookReviewLike = (0, bookReviewLike_1.default)(sequelize);
//source key는 왼쪽 db값의 값, target key는 오른쪽의 db값의 값
db.User.hasMany(db.UserBookList, {
    foreignKey: "userId",
    sourceKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
db.UserBookList.belongsTo(db.User, {
    foreignKey: "userId",
    targetKey: "id",
});
db.UserBookList.hasMany(db.BookReview, {
    foreignKey: "bookId",
    sourceKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
db.BookReview.belongsTo(db.UserBookList, {
    foreignKey: "bookId",
    targetKey: "id",
});
db.UserBookList.hasMany(db.BookParagraph, {
    foreignKey: "bookId",
    sourceKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
db.BookParagraph.belongsTo(db.UserBookList, {
    foreignKey: "bookId",
    targetKey: "id",
});
db.BookReview.hasMany(db.BookReviewLike, {
    foreignKey: "bookId",
    sourceKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
db.BookReviewLike.belongsTo(db.BookReview, {
    foreignKey: "bookId",
    targetKey: "id",
});
db.User.hasMany(db.BookReviewLike, {
    foreignKey: "userId",
    sourceKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
db.BookReviewLike.belongsTo(db.User, {
    foreignKey: "userId",
    targetKey: "id",
});
db.Op = sequelize_1.Op;
exports.default = db;
