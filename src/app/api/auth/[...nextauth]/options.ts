import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/app/models/user";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      // For your custom credentials field
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            email: credentials.email,
          });

          if (!user) {
            console.error("No user found with this email or username");
            throw new Error("No user found with this email or username");
          }

          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          if (isPasswordCorrect) {
            return {
              _id: user._id.toString(),
              name: user.name,
              email: user.email,
            };
          } else {
            console.error("Incorrect password");
            throw new Error("Incorrect password");
          }
        } catch (err: any) {
          console.error("Authorize error:", err);
          throw new Error(err.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Injecting user information in token
      if (user) {
        token._id = user._id.toString();
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      // Injecting user information in session
      if (token) {
        session.user._id = token._id.toString();
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },

  // Here we are assigning custom route for sign in
  pages: {
    signIn: "/SignIn",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET,
};
