import jwt from "jsonwebtoken";
const {sign} = jwt
import Token from "../models/token.js";

const createToken = async (payload) => {
  try {
    const token = sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });
    await Token.create({
      token: token,
      tokenable_type: "jwt",
      name: "bearer",
    });
    return token;
  } catch (err) {
    console.err("error while creating the token: ", err);
  }
};

const deleteToken = async (token) => {
  try {
    await Token.deleteMany({ token: token })
      .then((data) => {
        if (!data) {
          throw "Data Not Found";
        } else {
          return true;
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  } catch (err) {
    console.log(err);
  }
};

export { createToken, deleteToken };
