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

export const AddServices = async (req, res) => {
  try {
    const { heading, description, services } = req.body;

    const id = req.params;
    console.log("ID: ", id);

    if (!heading || !description || !services) {
      res
        .status(400)
        .json({ success: false, message: "Please fill all required fields." });
    }

    const servicesSection = await Service.findOneAndUpdate(
      id,
      {
        $set: {
          heading,
          description,
          services,
        },
      },
      { returnDocument: "after", upsert: true },
    );

    res.status(201).json({
      success: true,
      message: "Successfully add Services Section.",
      services: servicesSection,
    });
  } catch (error) {
    console.log("Add Services section: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Can't add Services section.",
    });
  }
};
