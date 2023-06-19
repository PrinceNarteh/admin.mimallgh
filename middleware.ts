export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/administrators/:path*",
    "/delivery-companies/:path*",
    "/orders/:path*",
    "/products/:path*",
    "/shops/:path*",
  ],
};
