import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        // ✅ Return all fields you want in session
        return {
          id: user.id,
          // name: user.name,
          email: user.email,
          role: user.role,
          // course: user.courses,
        };
      }
    })
  ],

  // ✅ JWT strategy for stateless sessions
  session: {
    strategy: "jwt"
  },

  // ✅ Add JWT and Session callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        // token.course = user.course;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        // session.user.course = token.course;
        session.user.email = token.email;
        // session.user.name = token.name;
      }
      return session;
    }
  },

  // Optional: custom sign-in page
  pages: {
    signIn: "/signin"
  },

  // Required for JWT encryption
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
