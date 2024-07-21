import { GoogleGenerativeAI } from "@google/generative-ai";


export async function Info(place="pune",country="india") {
  
  
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
      "description": "The name of the ${place},${country}."
    },
    "description": {
      "type": "string",
      "description": "A short description of the${place},${country}."
    },
    "highlights": {
      "type": "array",
      "description": "An array of highlights of the ${place},${country}.",
      "items": {
        "type": "string",
        "description": "A highlight of the ${place},${country}."
      }
    },
    "tips": {
      "type": "array",
      "description": "An array of additional tips for the particular ${place},${country}.",
      "items": {
        "type": "string",
        "description": "A tip for visiting the ${place},${country}."
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
