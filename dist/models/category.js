"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
class Category extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            categoryId: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                unique: true,
            },
            categoryName: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            parentId: {
                type: Sequelize.INTEGER(11),
                allowNull: true,
            },
            depth: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Category",
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: false,
        });
    }
}
exports.default = Category;
