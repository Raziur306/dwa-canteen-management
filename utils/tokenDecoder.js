import { jwtVerify } from "jose";

export const tokenDecoder = async (token) => {
  if (!token) {
    return;
  }
  const secret = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_SECRET
  );
  try {
    const { payload, protectedHeader } = await jwtVerify(
      token.split(" ")[1],
      secret
    );
    return payload;
  } catch (error) {
    console.error("Token verification error:", error);
  }
};
