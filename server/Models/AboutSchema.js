import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    aboutMe: {
      type: String,
      required: true,
    },

    highlights: [
      {
        title: {
          type: String,
          required: true,
        },

        description: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const About = mongoose.model("About", aboutSchema);

export default About;
