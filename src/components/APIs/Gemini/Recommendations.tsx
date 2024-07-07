import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from 'dotenv';

config();

export async function Run(Country: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
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
