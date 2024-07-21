import { GoogleGenerativeAI } from "@google/generative-ai";


export async function Info(place="",country="") {
  
  console.log(place)
  console.log(country)
  const apiKey = process.env.NEXT_PUBLIC_GEMINI;
  if (!apiKey) {
    throw new Error("GEMINI is not defined");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Choose a model that's appropriate for your use case.
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: { responseMimeType: "application/json" }
  });

  let prompt = `
    give information about ${place},${country} for tourist :
    {
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "The name of the place."
    },
    "description": {
      "type": "string",
      "description": "A detailed description of the place."
    },
    "highlights": {
      "type": "array",
      "description": "An array of highlights of the place.",
      "items": {
        "type": "string",
        "description": "A highlight of the place."
      }
    },
    "tips": {
      "type": "array",
      "description": "An array of additional tips for the particular place.",
      "items": {
        "type": "string",
        "description": "A tip for visiting the place."
      }
    }
  },
  "required": ["name", "description"],
  "additionalProperties": false
}

  `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text =  response.text(); // Await the text() method since it returns a promise
  const data = JSON.parse(text);
  
  return data;
}
