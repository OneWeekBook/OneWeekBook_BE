import Sequelize from "sequelize";

class BookReviewLike extends Sequelize.Model {
  static init(sequelize: any) {
    return super.init(
      {
        state: {
          type: Sequelize.INTEGER(1), // 0 : 흥미로움, 1: 유용함
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "BookParagraph",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db: any) {
    db.BookReviewLike.belongsTo(db.UserBookList, {
      foreignKey: "userBookListId",
      targetKey: "id",
    });

    db.BookReviewLike.belongsTo(db.User, {
      foreignKey: "userId",
      targetKey: "id",
    });
  }
}

export default BookReviewLike;
