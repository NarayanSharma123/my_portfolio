import mongoose from "mongoose";

const footerSchema = new mongoose.Schema(
  {
    socialLinks: [
      {
        icon: {
          type: String,
          required: true,
        },

        title: { 
          type: String,
          required: true,
        },

        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const Footer = mongoose.model("Footer", footerSchema);

export default Footer;
