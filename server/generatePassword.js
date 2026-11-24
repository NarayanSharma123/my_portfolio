import bcrypt from "bcryptjs";

const generatePassword = async (req, res) => {
  try {
    const password = "rj37sc2608";

    const hashedPassword = await bcrypt.hash(password, 16);

    console.log("Hashed Password:", hashedPassword);
  } catch (error) {
    console.log("Hash pass error: ", error);

    return res.status(500).json({ success: false, message: "Server error" });
  }
};

generatePassword()