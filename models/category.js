const Category = (sequelize, DataTypes) => {
  return sequelize.define(
    "category",
    {
      categoryId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        unique: true,
      },
      categoryName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      parentId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      depth: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

module.exports = Category;
