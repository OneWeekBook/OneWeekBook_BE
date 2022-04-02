const BookReview = (sequelize, DataTypes) => {
  return sequelize.define("bookReview", {
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    like: {
      type: DataTypes.INTEGER(11),
      defaultValue: 0,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  });
};

module.exports = BookReview;
