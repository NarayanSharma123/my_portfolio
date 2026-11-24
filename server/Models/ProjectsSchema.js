import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projects: [
      {
        title: {
          type: String,
          required: true,
        },

        subtitle: {
          type: String,
          required: true,
        },

        description: {
          type: String,
          required: true,
        },

        technologies: [
          {
            type: String,
            required: true,
          },
        ],

        liveDemo: {
          type: String,
          required: true,
        },

        sourceCode: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
