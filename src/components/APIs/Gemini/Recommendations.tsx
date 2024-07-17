import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from 'dotenv';

config();

export async function Run(Country: string) {
  const Key = process.env.NEXT_PUBLIC_GEMINI;
  if (!Key) {
    throw new Error("NEXT_PUBLIC_GEMINI is not defined");
  }

  const genAI = new GoogleGenerativeAI(Key);
  
  // Choose a model that's appropriate for your use case.
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  let prompt = `
    Give list of 25 top tourist destinations in ${Country}:

    {
      "places": [25 top destinations]
    } 
  `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = await response.text(); // Await the text() method since it returns a promise
  const data = JSON.parse(text);
  
  return data;
}
