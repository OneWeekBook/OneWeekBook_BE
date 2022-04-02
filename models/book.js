const Book = (sequelize, DataTypes) => {
  return sequelize.define("book", {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  });
};

module.exports = Book;
