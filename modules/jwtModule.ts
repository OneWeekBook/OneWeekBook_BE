import jwt from "jsonwebtoken";
import { secretKey } from "../config/jwtConfig.json";

interface PayloadTypes {
  id: string;
}

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
    }
  }
};
