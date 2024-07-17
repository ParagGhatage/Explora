"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
  Icon3dCubeSphere,
  IconBrandX,
  IconBrandGmail,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconPhoneCall,
  IconLocation
} from "@tabler/icons-react";
import axios from "axios"
import Link from "next/link";

export function ContactUs() {
  

  const [user, setUser] = React.useState({
    email: "",
    message: "",
    name: "",
})
 

const onEmail = async () => {
      try {

          const response = await axios.post("/api/send", user);
          console.log( response.data);
          
      } catch (error:any) {
          console.log("Enable to send email", error.message);
          
      }
    }

  return (
  <div className="flex-auto justify-center lg:flex">
    <div className="max-w-md mx-auto bg-white rounded-none md:rounded-2xl p-4 md:p-8 shadow-input  mt-20 placeholder:text-black w-full">
      <div className="font-bold text-3xl text-black pt-3 ">
        Nice to meet you
      </div>
      <div className="text-slate-600 text-sm max-w-sm mt-2">
        Send me an email right from here
      </div>

      <form className="my-8 placeholder:text-black" onSubmit={onEmail}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer className=" text-black ">
            <Label htmlFor="name" className="text-black placeholder:text-black ">Your Name</Label>
            <Input id="name" placeholder="Your Name" type="text"
            value={user.name} 
            onChange={(e) => setUser({...user, name: e.target.value})}
            className=" text-black placeholder:text-black bg-indigo-100"/>
          </LabelInputContainer>
          
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="Email id" type="email"
          value={user.email} 
          onChange={(e) => setUser({...user, email: e.target.value})}
          className="placeholder:text-black bg-indigo-100"/>
        </LabelInputContainer>

        <LabelInputContainer className="h-56">
            <Label htmlFor="message">Message</Label>
            <Input id="message" placeholder="Your message..." type="text"
            value={user.message}
            onChange={(e) => setUser({...user, message: e.target.value})}
           className=" placeholder:text-black h-40 md:max-w-xl px-4 py-2 bg-indigo-100 whitespace-normal break-words resize-y"
          />
          </LabelInputContainer>

        <div className="text-center">
        <button
          className="text-center border text-black font-extrabold bg-violet-600 p-5 rounded-full border-stone-950 hover:bg-fuchsia-500"
          type="submit"
          
        >
          Send &rarr;
          <BottomGradient />
        </button>
        </div>
        

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        
        
      </form>
    </div>
    <div className="mt-20 mr-20 bg-white p-6 rounded-lg">
        <div className="text-3xl font-semibold text-slate-600">
        Info
        </div>

        <div className="bg-slate-100 rounded-lg shadow-orange-100">
        <a href="https://paragghatage.com">
            <div className="m-3 text-slate-600 font-normal flex">
                <Icon3dCubeSphere className="text-slate-600"/>
                
                <div className="ml-3">
                paragghatage.com
                </div>
                
            </div>
            </a>
        </div>

        
        

        <div>
            <div className="m-3 text-slate-600 font-normal flex">
                <IconLocation className="text-slate-600"/>
                <div className="ml-3">
                India
                </div>
                
            </div>
        </div>

        <div className="mt-5">
        <div className="text-3xl font-semibold text-slate-600 mt-7 ">
        Socials
        </div>
        <div className="flex flex-col space-y-4 mt-5">
        <Link href={"https://mail.google.com/mail/u/1/#inbox?compose=DmwnWrRtsnWMdWLblVbzKmbktPSRRGRTPvPMCVZfFwtCQBkHfMzjdtRdMglGlGBlKjbqnGxffthv"}>
<div
  className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
> 

  <IconBrandGmail className="h-4  text-black" /> 
  <div className="text-black  text-sm text-center">
    Email
  </div>
  <BottomGradient />
</div>
</Link>

<a href="https://github.com/ParagGhatage">
<div
  className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
> 
  <IconBrandGithub className="h-4  text-black" /> 
  <span className="text-black text-sm text-center">
    GitHub
  </span>
  <BottomGradient />
</div>
</a>

<a href="https://x.com/PARAG_GHATAGE">
<div
  className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
> 
  <IconBrandX className="h-4  text-black" /> 
  <span className="text-black text-sm text-center">
    X
  </span>
  <BottomGradient />
</div>
</a>

<a href="https://www.instagram.com/parag_ghatage_35/">
<div
  className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
> 
  <IconBrandInstagram className="h-4  text-black" /> 
  <span className="text-black text-sm text-center">
    Instagram
  </span>
  <BottomGradient />
</div>
</a>

<a href="https://www.linkedin.com/in/parag-ghatage-09685a314/">
<div
  className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
> 
  <IconBrandLinkedin className="h-4  text-black" /> 
  <span className="text-black text-sm text-center">
    LinkedIn
  </span>
  <BottomGradient />
</div>
</a>


</div>
        </div >
        
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
