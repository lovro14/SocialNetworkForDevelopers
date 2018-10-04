import User from "./user";

class UserRepository {
  constructor(User) {
    this.User = User;
  }

  createUser(user) {
    return this.User.create(user);
  }

  findOne(query) {
    return this.User.findOne(query).lean(true);
  }

  update(query, update, options) {
    return this.User.findOneAndUpdate(query, update, options);
  }

  remove(query) {
    return this.User.remove(query);
  }
}

export default new UserRepository(User);
