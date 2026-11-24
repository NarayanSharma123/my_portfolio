import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    }, 

    services: [
      {
        icon: {
          type: String,
          required: true,
        },

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

const Service = mongoose.model("Service", serviceSchema);

export default Service;
