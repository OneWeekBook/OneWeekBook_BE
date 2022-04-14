const BookParagraph = (sequelize, DataTypes) => {
  return sequelize.define("bookParagraph", {
    paragraph: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};

module.exports = BookParagraph;
