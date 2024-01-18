import { prisma } from "../../lib";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as jose from "jose";

const login = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Something went wrong" });
    }
    const { email, password } = req.body;

    const existUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!existUser) {
      res.status(404).json({ message: "User not exist" });
    }

    const passCompare = await bcrypt.compare(password, existUser.password);
    if (!passCompare) {
      return res
        .status(401)
        .json({ message: "Login credentials not matching" });
    }

    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET);

    const token = await new jose.SignJWT({
      email: existUser.email,
      role: existUser.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.toString() });
  }
};

export default login;
