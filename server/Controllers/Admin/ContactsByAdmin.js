import Contact from "../../Models/ContactSchema.js";

export const GetContactByAdmin = async (req, res) => {
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

export const AddContactByAdmin = async (req, res) => {
  try {
    const { contacts, opportunity } = req.body;

    const id = req.params;

    if (!contacts || !opportunity) {
      res
        .status(400)
        .json({ success: false, message: "Please fill all required fields." });
    }

    const contactsSection = await Contact.findOneAndUpdate(
      id,
      {
        $set: {
          contacts,
          opportunity,
        },
      },
      { returnDocument: "after", upsert: true },
    );

    res.status(201).json({
      success: true,
      message: "Successfully add Contacts Section.",
      contacts: contactsSection,
    });
  } catch (error) {
    console.log("Add Contacts section: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Can't add Contacts section.",
    });
  }
};
