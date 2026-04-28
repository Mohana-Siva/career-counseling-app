import Profile from "../models/Profile.js";

// GET logged-in user's profile
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
      .populate("clg_id", "collegeName branchName tneaCode nirfRank");

    if (!profile) {
      return res.status(200).json({ message: "No profile found", profile: null });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// CREATE or UPDATE profile
export const updateProfile = async (req, res) => {
  try {
    const existing = await Profile.findOne({ user: req.user.id });

    let profile;

    if (!existing) {
      // Create profile
      profile = await Profile.create({
        user: req.user.id,
        ...req.body,
      });
    } else {
      // Update profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: req.body },
        { new: true }
      );
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export const saveLatestQuizResult = async (req, res) => {
  try {
    const { quizResult } = req.body;
    if (!quizResult || typeof quizResult !== "object") {
      return res.status(400).json({ error: "quizResult is required." });
    }

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        $set: {
          latestQuizResult: quizResult,
          latestQuizUpdatedAt: new Date(),
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.json({
      message: "Latest quiz result saved.",
      latestQuizUpdatedAt: profile.latestQuizUpdatedAt,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to save latest quiz result" });
  }
};
