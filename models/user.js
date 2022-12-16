const { bcrypt } = require("../config");
const bcryptJs = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      hooks: {
        beforeCreate: async (data, option, next) => {
          console.log("==========bcrypt======= :: ", bcrypt.salt);
          const hash = await bcryptJs.hash(
            data.password,
            parseInt(bcrypt.salt)
          );
          data.password = hash;
          console.log("a hook before create.... ");
        }
      },
    }
  );
  return User;
};
