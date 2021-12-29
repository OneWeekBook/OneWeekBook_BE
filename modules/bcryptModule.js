const bcrypt = require("bcrypt");
const { saltRounds } = require("../config/bcryptConfig.json");
const bcryptModule = {
  compare: async (inputPassword, dbPassword) => {
    const passwordTrueFalse = await bcrypt.compare(inputPassword, dbPassword);
    console.log(passwordTrueFalse);
    return passwordTrueFalse;
  },
  hash: async (inputPassword) => {
    const hash = await bcrypt.hash(inputPassword, saltRounds);
    console.log(hash);
    return hash;
  },
};

module.exports = bcryptModule;
