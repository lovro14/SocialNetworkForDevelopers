import repository from "../data/post-repository";

class PostController {
  constructor(repository) {
    this.repository = repository;
    this.addPost = this.addPost.bind(this);
    this.get = this.get.bind(this);
    this.delete = this.delete.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.addComment = this.addComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
    this.getPost = this.getPost.bind(this);
  }

  async addPost(req, res, next) {
    const newPost = {
      userId: req.authData._id,
      text: req.body.text,
      name: req.authData.name,
      profilePicture: req.authData.profilePicture
    };
    try {
      req.newPost = await this.repository.createPost(newPost);
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async get(req, res, next) {
    try {
      req.fetchedPosts = await this.repository.get({});
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async getPost(req, res, next) {
    try {
      req.fetchedPost = await this.repository.get({
        _id: req.params.post_id
      });
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async deletePost(req, res, next) {
    try {
      await this.repository.remove({ _id: req.params.post_id });
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await this.repository.remove({ userId: req.authData._id });
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async updatePost(req, res, next) {
    try {
      req.newPost = await this.repository.update(
        { _id: req.params.post_id },
        { text: req.body.text },
        { new: true }
      );
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async addComment(req, res, next) {
    try {
      const newComment = {
        text: req.body.text,
        userId: req.authData._id,
        profilePicture: req.authData.profilePicture,
        name: req.authData.name
      };
      req.newPost = await this.repository.postAction(
        { _id: req.params.post_id },
        { $push: { comments: newComment } },
        { new: true }
      );
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async deleteComment(req, res, next) {
    try {
      req.newPost = await this.repository.postAction(
        { _id: req.params.post_id },
        {
          $pull: {
            comments: { _id: req.params.comment_id }
          }
        },
        { new: true }
      );
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async updateComment(req, res, next) {
    try {
      req.newPost = await this.repository.update(
        {
          _id: req.params.post_id,
          comments: {
            $elemMatch: { _id: req.params.comment_id, userId: req.authData._id }
          }
        },
        {
          $set: {
            "comments.$.text": req.body.text
          }
        },
        { new: true }
      );
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async like(req, res, next) {
    try {
      req.newPost = await this.repository.postAction(
        { _id: req.params.post_id },
        { $addToSet: { likes: req.authData._id } },
        { new: true }
      );
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async unlike(req, res, next) {
    try {
      req.newPost = await this.repository.postAction(
        { _id: req.params.post_id },
        { $pull: { likes: req.authData._id } },
        { new: true }
      );
      return next();
    } catch (err) {
      return next(err);
    }
  }
}

export default new PostController(repository);
