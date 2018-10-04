import { isEmpty } from "../../shared/utils";
import UserRepository from "../data/user-repository";
import bycrptjs from "bcryptjs";
import uuidv4 from "uuid/v4";

export const newTokenValidation = async (req, res, next) => {
  if (isEmpty(req.body.userId) || isEmpty(req.body.refreshToken)) {
    return res.status(400).send({ message: "Bad Request" });
  }
  const query = {
    _id: req.body.userId,
    refreshTokens: { $in: [req.body.refreshToken] }
  };
  req.user = await UserRepository.findOne(query);
  if (isEmpty(req.user)) {
    return res.status(400).send({ message: "Bad Request" });
  }
  return next();
};

export const generateRefreshToken = async (req, res, next) => {
  try {
    let refreshTokens = req.user.refreshTokens.slice();
    refreshTokens.splice(
      refreshTokens.findIndex(
        refreshToken => refreshToken === req.body.refreshToken
      ),
      1
    );

    req.refreshToken = bycrptjs.hashSync(uuidv4(), bycrptjs.genSaltSync(8));
    refreshTokens.unshift(req.refreshToken);

    await UserRepository.update(
      { _id: req.user._id },
      {
        refreshTokens: refreshTokens
      },
      {}
    );
    return next();
  } catch (error) {
    return next(error);
  }
};
