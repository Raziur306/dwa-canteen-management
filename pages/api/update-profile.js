import { prisma } from "@/lib";
import { tokenDecoder } from "@/utils";

const updateProfile = async (req, res) => {
  try {
    if (req.method !== "PUT") {
      return res.status(405).json({ message: "Something went wrong" });
    }
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const { email: tokenEmail } = await tokenDecoder(token);

    const existUser = await prisma.user.findFirst({
      where: {
        email: tokenEmail,
      },
    });

    if (!existUser) {
      res.status(404).json({ message: "User not exist" });
    }
    const { name, email, phone, address, image } = req.body;

    await prisma.user.update({
      where: {
        id: existUser.id,
      },
      data: {
        name,
        email,
        phone: phone.toString(),
        address,
        image,
      },
    });

    return res.status(200).json(existUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.toString() });
  }
};

export default updateProfile;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
