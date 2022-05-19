import Sequelize from "sequelize";

class BookParagraph extends Sequelize.Model {
  static init(sequelize: any) {
    return super.init(
      {
        paragraph: {
          type: Sequelize.TEXT,
          allowNull: true,
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
    db.BookParagraph.belongsTo(db.UserBookList, {
      foreignKey: "bookId",
      targetKey: "id",
    });
  }
}

export default BookParagraph;
