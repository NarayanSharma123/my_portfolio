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

export const AddHeroData = async (req, res) => {
  try {
    const {
      availabilityText,
      firstName,
      lastName,
      designation,
      description,
      profileImage,
      resume,
      heroStats,
    } = req.body;

    const id = req.params;
    console.log("ID: ", id);

    if (!heroStats || !description || !designation || !firstName || !lastName) {
      res
        .status(400)
        .json({ success: false, message: "Please fill all required fields." });
    }

    const heroSection = await Hero.findOneAndUpdate(
      id,
      {
        $set: {
          availabilityText,
          firstName,
          lastName,
          designation,
          description,
          profileImage,
          resume,
          heroStats,
        },
      },
      { returnDocument: "after", upsert: true },
    );

    res.status(201).json({
      success: true,
      message: "Successfully add hero section.",
      hero: heroSection,
    });
  } catch (error) {
    console.log("Add Hero section: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Can't add Hero section.",
    });
  }
};
