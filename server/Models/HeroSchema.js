import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    // Availability Badge
    availabilityText: {
      type: String,
      default: "Open to Internship Opportunities",
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    // Professional Details
    designation: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Profile Image
    profileImage: {
      type: String,
      default: "",
    },

    // Resume Button
    resume: {
      type: String,
      default: "",
    },

    // Hero Statistics
    heroStats: [
      {
        label: {
          type: String,
          required: true,
          trim: true,
        },

        value: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const Hero = mongoose.model("Hero", heroSchema);

export default Hero;
