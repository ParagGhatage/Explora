"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import axios from "axios"
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';


export default function SignIn() {
  const router = useRouter();
  

  const [user, setUser] = React.useState({
    email: "",
    password: ""
})
 

const onEmail = async () => {
      try {

          const response = await axios.post("/api/SignIn", user);
          console.log( response.data);
          
      } catch (error:any) {
          console.log("Enable to send email", error.message);
          
      }
    }

  const handleGoogleSignin = async () => {
    const res = await axios.post("/api/auth/[...nextauth]")
    console.log(res)
  }

  const onSubmit = async (user) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: user.email,
      password: user.password,
    });

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        console.log("Incorrect email or password",result.error)
      } else {
        console.log("something went wrong",result.error)
      }
    }

    if (result?.url) {
      router.push('/Home');//redirecting to Home
    }
  };

  return (
  <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
    <Navbar/>
    <div>
      <button onClick={handleGoogleSignin}>
        Sign In with Google
      </button>
    </div>
    <div className="max-w-md mx-auto shadow shadow-slate-400 rounded-none md:rounded-2xl p-4 md:p-8  bg-white mt-14 placeholder:text-black w-full">
      <div className="font-bold text-3xl text-black pt-3  text-center">
        SignIn
      </div>
      <div className="text-slate-600 text-sm max-w-sm mt-2 flex text-center justify-center">
        <div className="pt-2">
        Don't have an account? 
        </div>
        
        <Link href={"/SignUp"}>
        <div className="ml-4 text-blue-700 hover:bg-green-200 p-2 rounded-md">
            Sign Up
        </div>
        </Link>
        
      </div>

      <form className="my-8 placeholder:text-black" onSubmit={onEmail}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="Email id" type="email"
          value={user.email} 
          onChange={(e) => setUser({...user, email: e.target.value})}
          className="placeholder:text-black bg-indigo-100"/>
        </LabelInputContainer>

        <LabelInputContainer className="">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Password" type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
           className=" placeholder:text-black md:max-w-xl px-4 py-2 bg-indigo-100 whitespace-normal break-words "
          />
          </LabelInputContainer>

        <div className="text-center">
        <button
          className="text-center border mt-4 text-black font-extrabold bg-violet-600 p-5 rounded-full border-stone-950 hover:bg-fuchsia-500"
          type="submit"
          
        >
          Sign In &rarr;
          <BottomGradient />
        </button>
        </div>
        

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent  h-[1px] w-full" />
        
        
      </form>
    </div>
  </div>
    
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
