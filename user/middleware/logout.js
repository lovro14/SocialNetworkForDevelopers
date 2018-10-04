import { isEmpty } from "../../shared/utils";
import UserRepository from "../data/user-repository";

export const logoutValidation = async (req, res, next) => {
  if (isEmpty(req.body.refreshToken)) {
    return res.status(400).send({ message: "Bad Request" });
  }

  try {
    const query = {
      _id: req.authData._id,
      refreshTokens: { $in: [req.body.refreshToken] }
    };
    const user = await UserRepository.findOne(query);
    if (isEmpty(user)) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    let refreshTokens = user.refreshTokens.slice();
    refreshTokens.splice(
      refreshTokens.findIndex(
        refreshToken => refreshToken === req.body.refreshToken
      ),
      1
    );
    await UserRepository.update(
      { _id: req.authData._id },
      {
        refreshTokens: refreshTokens
      },
      {}
    );

    return next();
  } catch (err) {
    return next(err);
  }
};
