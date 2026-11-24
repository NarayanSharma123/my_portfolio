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

export const AddProjects = async (req, res) => {
  try {
    const { projects } = req.body;

    const id = req.params;
    console.log("ID: ", id);

    if (!projects) {
      res
        .status(400)
        .json({ success: false, message: "Please fill all required fields." });
    }

    const projectsSection = await Project.findOneAndUpdate(
      id,
      {
        $set: {
          projects,
        },
      },
      { returnDocument: "after", upsert: true },
    );

    res.status(201).json({
      success: true,
      message: "Successfully add Projects Section.",
      projects: projectsSection,
    });
  } catch (error) {
    console.log("Add Projects section: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Can't add Projects section.",
    });
  }
};
