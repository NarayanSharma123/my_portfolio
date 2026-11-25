import About from "../../Models/AboutSchema.js";

export const GetAboutByAdmin = async (req, res) => {
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

export const AddAboutByAdmin = async (req, res) => {
  try {
    const { aboutMe, highlights } = req.body;

    const id = req.params;

    if (!aboutMe || !highlights) {
      res
        .status(400)
        .json({ success: false, message: "Please fill all required fields." });
    }

    const aboutSection = await About.findOneAndUpdate(
      id,
      {
        $set: {
          aboutMe,
          highlights,
        },
      },
      { returnDocument: "after", upsert: true },
    );

    res.status(201).json({
      success: true,
      message: "Successfully add about me section.",
      about: aboutSection,
    });
  } catch (error) {
    console.log("Add About section: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Can't add About section.",
    });
  }
};
