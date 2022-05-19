import jwt from "jsonwebtoken";
import { secretKey } from "../config/jwtConfig.json";

const jwtModule = {
  create: (payload) => {
    //option을 아래와 같이 주려면 payload값이 {}형태여야 sign이 됨
    const option = {
      algorithm: "HS256",
      expiresIn: "30d",
      issuer: "oneweekbook",
    };

    const token = jwt.sign(payload, secretKey, option);
    return token;
  },
  verify: (token: string) => {
    try {
      const decode = jwt.verify(token, secretKey);
      return decode;
    } catch (error: Error) {
      if (error.name === "TokenExpiredError") {
        console.log("expired token");
        return -1;
      } else if (error.name === "JsonWebTokenError") {
        console.log("invalid token");
        return -2;
      } else {
        console.log("jwt not active");
        return -3;
      }
    }
  },
};

export default jwtModule;
