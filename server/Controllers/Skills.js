import Skill from "../Models/SkillsSchema.js";

export const GetSkills = async (req, res) => {
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
