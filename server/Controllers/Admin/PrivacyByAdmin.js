import Privacy from "../../Models/PrivacySchema.js";

export const GetPrivacyByAdmin = async (req, res) => {
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

export const AddPrivacyByAdmin = async (req, res) => {
  try {
    const { sections } = req.body;

    const id = req.params;
    console.log("ID: ", id);

    if (!sections) {
      res
        .status(400)
        .json({ success: false, message: "Please fill all required fields." });
    }

    const privacySection = await Privacy.findOneAndUpdate(
      id,
      {
        $set: {
          sections,
        },
      },
      { returnDocument: "after", upsert: true },
    );

    res.status(201).json({
      success: true,
      message: "Successfully add Privacy Section.",
      privacy: privacySection,
    });
  } catch (error) {
    console.log("Add Privacy section: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Can't add Privacy section.",
    });
  }
};
