// // middleware.ts
// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/dashboard/:path*"]
// };


// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {
//     const role = req.nextauth.token?.role;

//     // ✅ Only allow admin users
//     if (role !== "admin") {
//       return NextResponse.redirect(new URL("/unauthorized", req.url));
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token // Basic check for logged-in users
//     }
//   }
// );

// export const config = {
//   matcher: ["/dashboard/:path*"]
// };
