const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        username: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        nick: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        role: {
          type: Sequelize.INTEGER(2),
          defaultValue: 1, //0: 관리자, 1: 새싹, 2: 떡잎,
        },
      },
      {
        sequelize,
        modelName: "User",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
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

export default User;
// import config from "../config";
// import {
//   Model,
//   InferAttributes,
//   InferCreationAttributes,
//   CreationOptional,
//   Sequelize,
//   DataTypes,
// } from "sequelize";
// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   config
// );

// class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
//   // declare id: CreationOptional<number>;
//   declare username: string;
//   declare email: string;
//   declare password: string;
//   declare nick: string;
//   declare role: number;
//   // declare createdAt: CreationOptional<Date>;
//   // declare updatedAt: CreationOptional<Date>;
// }

// User.init(
//   {
//     username: {
//       type: DataTypes.STRING(30),
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING(50),
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//     },
//     nick: {
//       type: DataTypes.STRING(30),
//       allowNull: true,
//     },
//     role: {
//       type: DataTypes.INTEGER(2),
//       defaultValue: 1, //0: 관리자, 1: 새싹, 2: 떡잎,
//     },
//   },
//   {
//     sequelize,
//     modelName: "User",
//     charset: "utf8",
//     collate: "utf8_general_ci",
//   }
// );
