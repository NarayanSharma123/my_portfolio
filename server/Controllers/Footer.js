import Footer from "../Models/FooterSchema.js";

export const GetFooter = async (req, res) => {
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
