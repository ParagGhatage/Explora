import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from 'dotenv';


export async function Run(Country:string) {
    config()
    const genAI = new GoogleGenerativeAI("AIzaSyDD19ZpT6eTCwzl0VfmPd2rkN_96-d9xL8")
  // Choose a model that's appropriate for your use case.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = `Give me array of top 50 tourist attractions in ${Country},in neat way and only names, one number on each line`

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  
  return(
    response.candidates[0].content.parts[0].text
  )
}
