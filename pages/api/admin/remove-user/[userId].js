import { prisma } from "@/lib";
import { tokenDecoder } from "@/utils";

const removeUser = async (req, res) => {
  try {
    if (req.method !== "DELETE") {
      return res.status(405).json({ message: "Something went wrong" });
    }
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const { role } = await tokenDecoder(token);
    if (role !== "admin") {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    const { userId } = req.query;

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    res.status(204).json({ message: "User removed successfully." });
  } catch (error) {
    console.log(error);
  }
};
export default removeUser;
