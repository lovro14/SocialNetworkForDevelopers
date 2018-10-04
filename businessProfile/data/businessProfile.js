import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const businessProfileSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    identityName: {
      type: String,
      required: true
    },
    company: {
      type: String,
      default: ""
    },
    website: {
      type: String,
      default: ""
    },
    github: {
      type: String,
      default: ""
    },
    location: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      required: true
    },
    skills: {
      type: [String],
      required: true
    },
    bio: {
      type: String,
      default: ""
    },
    experience: [
      {
        title: {
          type: String,
          required: true
        },
        company: {
          type: String,
          required: true
        },
        location: {
          type: String
        },
        from: {
          type: Date,
          required: true
        },
        to: {
          type: Date
        },
        current: {
          type: Boolean,
          default: false
        },
        description: {
          type: String,
          required: true
        }
      }
    ],
    education: [
      {
        collegeName: {
          type: String,
          required: true
        },
        degree: {
          type: String,
          required: true
        },
        fieldOfStudy: {
          type: String,
          required: true
        },
        from: {
          type: Date,
          required: true
        },
        to: {
          type: Date
        },
        current: {
          type: Boolean,
          default: false
        },
        description: {
          type: String
        }
      }
    ],
    projects: [
      {
        title: {
          type: String,
          required: true
        },
        projectSummary: {
          type: String,
          required: true
        },
        projectImages: {
          type: [String],
          default: []
        },
        from: {
          type: Date,
          required: true
        },
        to: {
          type: Date,
          required: true
        },
        role: {
          type: String,
          required: true
        },
        contribution: {
          type: String,
          required: true
        },
        technologies: {
          type: [String],
          required: true
        }
      }
    ],
    social: {
      twitter: {
        type: String,
        default: ""
      },
      facebook: {
        type: String,
        default: ""
      },
      linkedin: {
        type: String,
        default: ""
      },
      instagram: {
        type: String,
        default: ""
      },
      youtube: {
        type: String,
        default: ""
      }
    }
  },
  {
    timestamps: { createdAt: "_createdAt", updatedAt: "_updatedAt" }
  }
);

export default mongoose.model("BusinessProfile", businessProfileSchema);
