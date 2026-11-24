import Hero from "../../Models/HeroSchema.js";
import cloudinary from "../../Config/cloudinary.js";

export const GetHeroByAdmin = async (req, res) => {
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

// const uploadToCloudinary = (file, options) => {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       options,
//       (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       },
//     );

//     uploadStream.end(file.buffer);
//   });
// };

const uploadToCloudinary = (file, options) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          console.log("Cloudinary Raw Error:", error);
          console.log(
            "Cloudinary Error Details:",
            JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
          );

          reject(error);
        } else {
          resolve(result);
        }
      },
    );

    console.log("File Name:", file.originalname);
    console.log("File Type:", file.mimetype);
    console.log("File Size:", file.size);
    console.log("Buffer Exists:", !!file.buffer);

    uploadStream.end(file.buffer);
  });
};

export const AddHeroByAdmin = async (req, res) => {
  try {
    const {
      availabilityText,
      firstName,
      lastName,
      designation,
      description,
      resume: existingResume,
      heroStats,
    } = req.body;

    const id = req.params;

    if (!heroStats || !description || !designation || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const existingHero = await Hero.findOne(id);

    const profileImageFile = req.files?.profileImage?.[0];
    const resumeFile = req.files?.resume?.[0];

    if (!profileImageFile && !existingHero?.profileImage) {
      return res.status(400).json({
        success: false,
        message: "Please select a profile image.",
      });
    }

    let profileImage = existingHero?.profileImage || "";
    let resumeUrl = existingHero?.resume || existingResume || "";
    console.log("Uploading Profile Image...");

    if (profileImageFile) {
      const imageResult = await uploadToCloudinary(profileImageFile, {
        folder: "portfolio/profile",
        resource_type: "image",
      });

      profileImage = imageResult.secure_url;
    }

    console.log("Uploading Resume PDF...");

    if (resumeFile) {
      const safeFileName = resumeFile.originalname
        .replace(/\.pdf$/i, "")
        .replace(/[^a-zA-Z0-9_-]/g, "_");

      const resumeResult = await uploadToCloudinary(resumeFile, {
        folder: "portfolio/resume",
        resource_type: "raw",
        public_id: `${safeFileName}_${Date.now()}.pdf`,
      });

      resumeUrl = resumeResult.secure_url;
    }

    const parsedHeroStats =
      typeof heroStats === "string" ? JSON.parse(heroStats) : heroStats;

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
          resume: resumeUrl,
          heroStats: parsedHeroStats,
        },
      },
      {
        returnDocument: "after",
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    return res.status(201).json({
      success: true,
      message: "Successfully saved Hero section.",
      hero: heroSection,
    });
  } catch (error) {
    console.log("========== CLOUDINARY UPLOAD ERROR ==========");
    console.log("Message:", error.message);
    console.log("HTTP Code:", error.http_code);
    console.log("Name:", error.name);
    console.log("Full Error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Something went wrong, can't save Hero section.",
      cloudinaryCode: error.http_code,
    });
  }
};
