import Post from "./post";
import mongoose from "mongoose";

class PostRepository {
  constructor(Post) {
    this.Post = Post;
  }

  createPost(postData) {
    return this.Post.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId() },
      postData,
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
        populate: {
          path: "userId",
          options: { lean: true },
          select: { profilePicture: 1 }
        }
      }
    );
  }

  findOne(query) {
    return this.Post.findOne(query).lean(true);
  }

  remove(query) {
    return this.Post.remove(query);
  }

  update(query, update, options) {
    return this.Post.findOneAndUpdate(query, update, options);
  }

  postAction(query, update, options) {
    return this.Post.findOneAndUpdate(query, update, options)
      .populate({
        path: "userId",
        options: { lean: true },
        select: { profilePicture: 1 }
      })
      .populate({
        path: "comments.userId",
        options: { lean: true },
        select: { profilePicture: 1 }
      });
  }
  get(query) {
    return this.Post.find(query)
      .populate({
        path: "userId",
        options: { lean: true },
        select: { profilePicture: 1 }
      })
      .populate({
        path: "comments.userId",
        option: { lean: true },
        select: { profilePicture: 1 }
      });
  }
}

export default new PostRepository(Post);
