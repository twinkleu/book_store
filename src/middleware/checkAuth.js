import jwt from "jsonwebtoken";
const {verify} = jwt
import Token from "../models/token.js";
import User from "../models/user.js";

const checkAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw {
        message: "Access Token is Required",
      };
    }
    const bearer = req.headers.authorization;
    const token = bearer.split(" ")[1];

    await Token.findOne({ token: token })
      .then((data) => {
        {
          if (!data) {
            throw {
              message: "Inavlid Access Token",
            };
          } else {
            verify(
              data.token,
              `${process.env.SECRET_KEY}`,
              async (err, jwt_payload) => {
                if (err) {
                  throw {
                    message: "Unauthorized User",
                  };
                } else {
                  const user = await User.findOne({
                    _id: jwt_payload.id,
                    status: true,
                    isDeleted: false,
                  });
                  if (!user) {
                    throw {
                      message: "User Not Found",
                    };
                  } else {
                    req.id = user._id;
                    req.user = user;

                    next();
                  }
                }
              }
            );
          }
        }
      })
      .catch((err) => {
        throw {
          err: err,
          message: "Invalid Token",
        };
      });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Error", err: err });
  }
};

export default checkAuth;
