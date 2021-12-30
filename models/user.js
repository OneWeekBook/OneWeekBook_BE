const User = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    nick: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    state: {
      type: DataTypes.INTEGER(2),
      defaultValue: 0, //0은 회원, 1은 탈퇴회원,
    },
    status: {
      type: DataTypes.INTEGER(2),
      defaultValue: 0, //0은 일반회원, 1은 관리자,
    },
  });
};

module.exports = User;
