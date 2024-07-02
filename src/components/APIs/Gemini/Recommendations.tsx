import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from 'dotenv';


export async function Run(Country:string) {
  config()
  const genAI = new GoogleGenerativeAI("AIzaSyDD19ZpT6eTCwzl0VfmPd2rkN_96-d9xL8")
// Choose a model that's appropriate for your use case.
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json"}}
);
let prompt = `
          Give list of 25 top tourist destinations in ${Country}:

{
"places":[ 25 top destinations]
} 
`

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  const data = JSON.parse(text)
  
  return(
    data
  )
}
