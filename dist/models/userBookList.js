"use strict";
const Sequelize = require("sequelize");
class UserBookList extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            author: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            publisher: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            img: {
                type: Sequelize.STRING(100),
                allowNull: true,
                defaultValue: null,
            },
            isbn: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            progress: {
                type: Sequelize.INTEGER(1),
                allowNull: false,
                defaultValue: 0,
            },
            startTime: {
                type: Sequelize.DATE,
                defaultValue: null,
            },
            endTime: {
                type: Sequelize.DATE,
                defaultValue: null,
            },
            review: {
                type: Sequelize.TEXT,
                defaultValue: null,
            },
            rating: {
                type: Sequelize.DECIMAL(2, 1),
                defaultValue: 0,
            },
        }, {
            sequelize,
            modelName: "UserBookList",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate(db) {
        db.UserBookList.belongsTo(db.User, {
            foreignKey: "userId",
            targetKey: "id",
        });
        db.UserBookList.hasMany(db.BookParagraph, {
            foreignKey: "bookId",
            sourceKey: "id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        db.UserBookList.hasMany(db.BookReviewLike, {
            foreignKey: "userBookListId",
            sourceKey: "id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    }
}
module.exports = UserBookList;
