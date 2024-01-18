import { prisma } from "@/lib";
import { tokenDecoder } from "@/utils";

const userInfo = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Something went wrong" });
    }
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const { email } = await tokenDecoder(token);

    const existUser = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        phone: true,
        image: true,
      },
    });

    if (!existUser) {
      res.status(404).json({ message: "User not exist" });
    }

    return res.status(200).json(existUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.toString() });
  }
};

export default userInfo;
