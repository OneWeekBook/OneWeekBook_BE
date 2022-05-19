import jwt from "jsonwebtoken";
import { secretKey } from "../config/jwtConfig.json";

interface PayloadTypes {
  id: string;
}

<<<<<<< HEAD
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
=======
export const create = (payload: PayloadTypes) => {
  const token: string = jwt.sign(payload, secretKey, {
    algorithm: "HS256",
    expiresIn: "30d",
    issuer: "oneweekbook",
  });
  return token;
};
export const verify = (token: string) => {
  try {
    const decode = jwt.verify(token, secretKey);
    return decode;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      console.log("expired token");
      return -1;
    } else if (error.name === "JsonWebTokenError") {
      console.log("invalid token");
      return -2;
    } else {
      console.log("jwt not active");
      return -3;
>>>>>>> 08c5fd60383a23aaaf8343dc79f11d479a8d00fe
    }
  }
};
