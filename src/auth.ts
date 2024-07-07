import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
import {hashSync} from "bcryptjs" 
import dbConnect from "./lib/dbConnect"
import { NextResponse } from "next/server"
import UserModel from "./models/user.model"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        dbConnect()
        const hashedPassword = hashSync(credentials.password,10)
        let user = null
        try {
           user = await UserModel.findOne({
            $or: [
              { email: credentials.email },
              { password: hashedPassword },
            ],
          });
          if (!user) {
            NextResponse.json("no user found")
          }
        } catch (err: any) {
          throw new Error(err);
        }
        NextResponse.json("User:",user)
        return user
      },
    }),
  ],
 
})