import dbConnect from "@/lib/dbConnect";

import UserModel from "@/models/user.model";

import bcrypt from "bcryptjs"

export async function POST (request:Request){
    await dbConnect()

    try {
        const reqbody = await request.json()
        console.log(reqbody)
        const {name,email,password } = reqbody
        const existingUser= await UserModel.findOne(
            {
                name:name,
                email:email
            }
        )
        if(existingUser){
            
        }
       

        if(existingUser){
            
                return Response.json({
                    success:false,
                    message:"User already exists with this email"
                },
            {
                status:400
            })
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            const newUser = new UserModel({
                name:name,
                password:hashedPassword,
                email:email
            })

            const User = await newUser.save()

            
        }

        return Response.json({
            success:true,
            message:"User registered succefully"
        },
    {
        status:200
    })

    } catch (error) {
        console.error("error registering user",error)
        return Response.json({
            success:false,
            message:"error registering user"
        },
    {
        status:500
    })
    }
}