import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    contacts: [
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

        linkText: {
          type: String,
          required: true,
        },

        url: {
          type: String,
          required: true,
        },
      },
    ],

    opportunity: {
      icon: {
        type: String,
        required: true,
      },

      heading: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true },
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
