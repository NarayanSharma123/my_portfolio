import Project from "../Models/ProjectsSchema.js";

export const GetProjects = async (req, res) => {
  try {
    const id = req.params;

    const projectsSection = await Project.findOne(id);
    if (!projectsSection) {
      return res
        .status(404)
        .json({ success: false, message: "Projects data not found." });
    }

    res.status(200).json({
      success: true,
      message: "Successfully get Projects.",
      projects: projectsSection,
    });
  } catch (error) {
    console.log("Get Projects section: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Can't get Projects section.",
    });
  }
};
