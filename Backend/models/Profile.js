import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // 1 user = 1 profile
    },

    mobileNumber: { type: String, default: "" },
    dob: { type: String, default: "" },
    careerInterest: { type: String, default: "" },
    skills: { type: String, default: "" },
    latestQuizResult: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    latestQuizUpdatedAt: {
      type: Date,
      default: null,
    },

    clg_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      default: null,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
