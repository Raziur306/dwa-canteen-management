import { data } from "autoprefixer";
import { prisma } from "../../lib";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Something went wrong" });
    }
    const { email, password, name } = req.body;
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default registerUser;
