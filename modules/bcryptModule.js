const bcrypt = require("bcrypt");
const { saltRounds } = require("../config/bcryptConfig.json");
const salt = parseInt(saltRounds);
const bcryptModule = {
  compare: (inputPassword, dbPassword) => {
    try {
      const passwordTrueFalse = bcrypt.compareSync(inputPassword, dbPassword);
      return passwordTrueFalse;
    } catch (error) {
      return "error";
    }
  },
  hash: (inputPassword) => {
    try {
      const hash = bcrypt.hashSync(inputPassword, salt);
      return hash;
    } catch (error) {
      return false;
    }
  },
};

module.exports = bcryptModule;
