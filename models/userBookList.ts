const UserBookList = (sequelize, DataTypes) => {
  return sequelize.define("userBookList", {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    isbn: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    progress: {
      type: DataTypes.INTEGER(1), // 0:찜, 1:읽는중 2:읽기완료
      allowNull: false,
      defaultValue: 0,
    },
    startTime: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    endTime: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  });
};

module.exports = UserBookList;
