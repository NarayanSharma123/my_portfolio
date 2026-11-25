import Hero from "../Models/HeroSchema.js";

export const GetHeroData = async (req, res) => {
  try {
    const id = req.params;

    const heroSection = await Hero.findOne(id);
    if (!heroSection) {
      return res
        .status(404)
        .json({ success: false, message: "Hero section data not found." });
    }

    res.status(200).json({
      success: true,
      message: "Successfully get hero.",
      hero: heroSection,
    });
  } catch (error) {
    console.log("Get Hero section: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Can't get Hero section.",
    });
  }
};
