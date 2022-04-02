const BookProgress = (sequelize, DataTypes) => {
  return sequelize.define("bookProgress", {
    progress: {
      type: DataTypes.INTEGER(1), // 0: 찜, 1: 읽는중 2:읽기완료
      allowNull: false,
    },
  });
};

module.exports = BookProgress;
