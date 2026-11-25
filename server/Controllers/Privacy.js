import Privacy from "../Models/PrivacySchema.js";

export const GetPrivacy = async (req, res) => {
  try {
    const id = req.params;

    const privacySection = await Privacy.findOne(id);
    if (!privacySection) {
      return res
        .status(404)
        .json({ success: false, message: "Privacy data not found." });
    }

    res.status(200).json({
      success: true,
      message: "Successfully get Privacy.",
      privacy: privacySection,
    });
  } catch (error) {
    console.log("Get Privacy section: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Can't get Privacy section.",
    });
  }
};
