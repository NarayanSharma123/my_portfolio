import About from "../Models/AboutSchema.js";

export const GetAboutMe = async (req, res) => {
  try {
    const id = req.params;

    const aboutSection = await About.findOne(id);
    if (!aboutSection) {
      return res
        .status(404)
        .json({ success: false, message: "About me data not found." });
    }

    res.status(200).json({
      success: true,
      message: "Successfully get About.",
      about: aboutSection,
    });
  } catch (error) {
    console.log("Get About section: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Can't get About me section.",
    });
  }
};
