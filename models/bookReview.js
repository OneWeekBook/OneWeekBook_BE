const BookReview = (sequelize, DataTypes) => {
  return sequelize.define("bookReview", {
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likeCount: {
      type: DataTypes.INTEGER(11),
      defaultValue: 0,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      defaultValue: 0,
      allowNull: false,
    },
  });
};

module.exports = BookReview;
