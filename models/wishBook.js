const WishBook = (sequelize, DataTypes) => {
  return sequelize.define("wishBook", {
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
      defaultValue: null,
    },
    progress: {
      type: DataTypes.INTEGER(1), // 0:찜, 1:읽는중 2:읽기완료
      allowNull: false,
    },
  });
};

module.exports = WishBook;
