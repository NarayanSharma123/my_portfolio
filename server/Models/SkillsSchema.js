import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    categories: [
      {
        title: {
          type: String,
          required: true,
        },

        skills: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
  },
  { timestamps: true },
);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
