const BookReviewLike = (sequelize, DataTypes) => {
  return sequelize.define("bookReviewLike", {
    state: {
      type: DataTypes.INTEGER(1), // 0 : 흥미로움, 1: 유용함
      allowNull: false,
    },
  });
};

module.exports = BookReviewLike;
