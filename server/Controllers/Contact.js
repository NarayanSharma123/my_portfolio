import Contact from "../Models/ContactSchema.js";

export const GetContact = async (req, res) => {
  try {
    const id = req.params;

    const contactsSection = await Contact.findOne(id);
    if (!contactsSection) {
      return res
        .status(404)
        .json({ success: false, message: "Contacts data not found." });
    }

    res.status(200).json({
      success: true,
      message: "Successfully get Contacts.",
      contacts: contactsSection,
    });
  } catch (error) {
    console.log("Get Contacts section: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Can't get Contacts section.",
    });
  }
};
