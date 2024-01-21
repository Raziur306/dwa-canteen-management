import { tokenDecoder } from "@/utils";
import { NextResponse } from "next/server";
export const middleware = async (request) => {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("user_token")?.value;

  const isUserPath = "/my-order" == pathname || "/cart" == pathname;

  if (isUserPath) {
    if (pathname == "/login" && token) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    } else if (token) {
      return NextResponse.next();
    } else if (pathname != "/login") {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }

  const isAdminRoute = pathname.includes("/admin");
  if (isAdminRoute) {
    const user = await tokenDecoder(`Bearer ${token}`);
    if (user && user.role == "admin") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }
};
export const config = {
  matcher: ["/:path*", "/admin/:path*"],
};
