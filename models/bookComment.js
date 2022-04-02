const BookComment = (sequelize, DataTypes) => {
  return sequelize.define("bookComment", {
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};

module.exports = BookComment;
