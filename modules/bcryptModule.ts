import bcrypt from "bcrypt";
import { saltRounds } from "../config/bcryptConfig.json";
const salt: number = parseInt(saltRounds);

export const compare = async (inputPassword: string, dbPassword: string) => {
    try {
      const passwordTrueFalse = await bcrypt.compare(inputPassword, dbPassword);
      return {
        success: true,
        compare: passwordTrueFalse,
      };
    } catch (error) {
      return { success: false };
    }
  };
export const hash = async (inputPassword: string) => {
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

