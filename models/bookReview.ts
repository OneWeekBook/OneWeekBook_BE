const BookReview = (sequelize, DataTypes) => {
  return sequelize.define("bookReview", {
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      defaultValue: 0,
      allowNull: false,
    },
  });
};

export default BookReview;
