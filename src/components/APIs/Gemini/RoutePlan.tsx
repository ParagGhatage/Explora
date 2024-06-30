import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from 'dotenv';


export async function Plan(Start:string,End:string,Date:string) {
    config()
    const genAI = new GoogleGenerativeAI("AIzaSyDD19ZpT6eTCwzl0VfmPd2rkN_96-d9xL8")
  // Choose a model that's appropriate for your use case.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = `plan trip from ${Start} to ${End} on date ${Date} with detailed information give it each sentence as array element,remove all stars,dont ask user any questins,give direct answer`

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  
  return(
    response
  )
}
