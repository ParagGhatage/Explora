import  { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/app/models/user"


export const authOptions:NextAuthOptions = {
    providers:[
        Credentials({
            id:"Credentials",
            name:"Credentials",
            credentials:{
                email: { label: "Email" },
                password: { label: "Password", type: "password" },
            },
            async authorize( credentials:any ):Promise<any> {
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or:[
                            {email:credentials.email}
                        ]
                    })
                    if(!user){
                        throw new Error("No user found with this email or username")
                    }
                    
                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)
                    if(isPasswordCorrect){
                        return user
                    }else{
                        throw new Error("incorrect password")
                    }
                } catch (err:any) {
                    throw new Error(err)
                }
              },
        })
    ],
    callbacks:{
        async session({session,token}){
            if(token){
                session.user._id=token._id.toString()
                session.user.email =token.email
            }
            return session
        },
        async jwt({token,user}){
            if(user){
                token._id= user._id.toString()
                token.isAcceptingMessages= user.isAcceptingMessages
                token.isVerified= user.isVerified
                token.userName= user.userName
            }
            return token
        }
    },
    pages:{
        signIn:"/SignIn"
    },
    session:{
        strategy:"jwt"
    },
    secret: process.env.AUTH_SECRET
}
