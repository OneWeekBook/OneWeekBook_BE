const bcrypt = require("bcrypt");
const { saltRounds } = require("../config/bcryptConfig.json");
const salt = parseInt(saltRounds);
const bcryptModule = {
  compare: async (inputPassword, dbPassword) => {
    try {
      const passwordTrueFalse = await bcrypt.compare(inputPassword, dbPassword);
      return {
        success: true,
        compare: passwordTrueFalse,
      };
    } catch (error) {
      return { success: false };
    }
  },
  hash: async (inputPassword) => {
    try {
      const hash = await bcrypt.hash(inputPassword, salt);
      return {
        success: true,
        hash,
      };
    } catch (error) {
      return { success: false };
    }
  },
};

module.exports = bcryptModule;
