import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    publicId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    profilePicture: {
      type: String,
      default: ""
    },
    refreshTokens: {
      type: [String]
    }
  },
  {
    timestamps: { createdAt: "_createdAt", updatedAt: "_updatedAt" }
  }
);

export default mongoose.model("User", userSchema);
