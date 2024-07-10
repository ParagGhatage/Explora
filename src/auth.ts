import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "./lib/dbConnect";
import UserModel from "./models/user.model";

// Use the defined interface in your NextAuth configuration
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name:"credentials",
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        dbConnect(); // Ensure db connection is established
        let user= null;

        try {
          
          user = await UserModel.findOne({
            email: credentials.email
          });

          if (!user) {
            return null; // Return null if no user found
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error('Incorrect password');
          }

          // Return the user object if found
        } catch (error: any) {
          throw new Error(error.message || "An error occurred"); // Ensure error.message is a string or default to a generic message
        }
        
      },
    }),
  ],
});
