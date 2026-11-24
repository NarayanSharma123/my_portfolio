import Skill from "../../Models/SkillsSchema.js";

export const GetSkillsByAdmin = async (req, res) => {
  try {
    const id = req.params;

    const skillsSection = await Skill.findOne(id);
    if (!skillsSection) {
      return res
        .status(404)
        .json({ success: false, message: "Skills data not found." });
    }

    res.status(200).json({
      success: true,
      message: "Successfully get Skills.",
      skills: skillsSection,
    });
  } catch (error) {
    console.log("Get Skills section: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Can't get Skills section.",
    });
  }
};

export const AddSkillsByAdmin = async (req, res) => {
  try {
    const { categories } = req.body;

    const id = req.params;
    console.log("ID: ", id);

    if (!categories) {
      res
        .status(400)
        .json({ success: false, message: "Please fill all required fields." });
    }

    const skillsSection = await Skill.findOneAndUpdate(
      id,
      {
        $set: {
          categories,
        },
      },
      { returnDocument: "after", upsert: true },
    );

    res.status(201).json({
      success: true,
      message: "Successfully add Skills Section.",
      skills: skillsSection,
    });
  } catch (error) {
    console.log("Add Skills section: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Can't add Skills section.",
    });
  }
};
