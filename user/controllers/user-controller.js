import repository from "../data/user-repository";
import bycrptjs from "bcryptjs";
import uuidv4 from "uuid/v4";

class UserController {
  constructor(repository) {
    this.repository = repository;
    this.createUser = this.createUser.bind(this);
    this.delete = this.delete.bind(this);
    this.setProfilePicture = this.setProfilePicture.bind(this);
  }

  async createUser(req, res, next) {
    try {
      const password = bycrptjs.hashSync(
        req.body.password,
        bycrptjs.genSaltSync(8)
      );
      req.refreshToken = bycrptjs.hashSync(uuidv4(), bycrptjs.genSaltSync(8));
      const newUser = {
        publicId: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        password: password,
        refreshTokens: [req.refreshToken]
      };
      req.user = await this.repository.createUser(newUser);

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await this.repository.remove({ _id: req.authData._id });
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async setProfilePicture(req, res, next) {
    try {
      req.user = await this.repository.update(
        { _id: req.authData._id },
        {
          profilePicture: req.uploadedProfilePicture
        },
        { new: true }
      );
      return next();
    } catch (err) {
      return next(err);
    }
  }
}

export default new UserController(repository);
