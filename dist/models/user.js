"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = (sequelize, DataTypes) => {
    return sequelize.define("user", {
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        nick: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        role: {
            type: DataTypes.INTEGER(2),
            defaultValue: 1, //0: 관리자, 1: 새싹, 2: 떡잎,
        },
    });
};
exports.default = User;
