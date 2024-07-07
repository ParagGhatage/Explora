import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { hashSync } from "bcryptjs";
import dbConnect from "./lib/dbConnect";
import UserModel, { User } from "./models/user.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: "text" }, // Specify type as "text" for email
        password: { type: "password" }, // Specify type as "password" for password
      },
      authorize: async (credentials: Partial<Record<"email" | "password", string>>, request: any) => {
        dbConnect(); // Ensure db connection is established

        try {
          const hashedPassword = hashSync(credentials.password || "", 10);

          const user = await UserModel.findOne({
            $or: [
              { email: credentials.email || "" },
              { password: hashedPassword },
            ],
          });

          if (!user) {
            return null; // Return null if no user found
          }

          return user as User; // Return the user object if found
        } catch (error: any) {
          throw new Error(error.message || "An error occurred"); // Ensure error.message is a string or default to a generic message
        }
      },
    }),
  ],
});
