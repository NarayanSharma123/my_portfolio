import Service from "../Models/ServicesSchema.js";

export const GetServices = async (req, res) => {
  try {
    const id = req.params;

    const servicesSection = await Service.findOne(id);
    if (!servicesSection) {
      return res
        .status(404)
        .json({ success: false, message: "Services data not found." });
    }

    res.status(200).json({
      success: true,
      message: "Successfully get Services.",
      services: servicesSection,
    });
  } catch (error) {
    console.log("Get Services section: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Can't get Services section.",
    });
  }
};
