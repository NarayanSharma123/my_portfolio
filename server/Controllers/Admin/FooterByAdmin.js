import Footer from "../../Models/FooterSchema.js";

export const GetFooterByAdmin = async (req, res) => {
  try {
    const id = req.params;

    const footerSection = await Footer.findOne(id);
    if (!footerSection) {
      return res
        .status(404)
        .json({ success: false, message: "Footer data not found." });
    }

    res.status(200).json({
      success: true,
      message: "Successfully get Footer.",
      footer: footerSection,
    });
  } catch (error) {
    console.log("Get Footer section: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Can't get Footer section.",
    });
  }
};

export const AddFooterByAdmin = async (req, res) => {
  try {
    const { socialLinks } = req.body;

    const id = req.params;

    if (!socialLinks) {
      res
        .status(400)
        .json({ success: false, message: "Please fill all required fields." });
    }

    const footerSection = await Footer.findOneAndUpdate(
      id,
      {
        $set: {
          socialLinks,
        },
      },
      { returnDocument: "after", upsert: true },
    );

    res.status(201).json({
      success: true,
      message: "Successfully add Footer Section.",
      footer: footerSection,
    });
  } catch (error) {
    console.log("Add Footer section: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Can't add Footer section.",
    });
  }
};
