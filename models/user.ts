import { Model, DataTypes } from "sequelize";
import { dbType } from "../types/modelTypes";
import db from "./";

class User extends Model {
  static associate(db: dbType) {
    //source key는 왼쪽 db값의 값, target key는 오른쪽의 db값의 값
    db.User.hasMany(db.UserBookList, {
      foreignKey: "userId",
      sourceKey: "id", //왼쪽(user) db의 id값
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    db.User.hasMany(db.BookReviewLike, {
      foreignKey: "userId",
      sourceKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

User.init(
  {
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
  },
  {
    sequelize: db.sequelize,
    modelName: "User",
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);

export default User;
