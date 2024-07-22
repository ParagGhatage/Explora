import { GoogleGenerativeAI } from "@google/generative-ai";


export async function Plan(Start: string, End: string, Date: string, Days: number) {
  
  
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
    plan trip from ${Start} to ${End} on date ${Date} for ${Days} days with detailed information cover maximum possible tourist destinations:

    {
      "type": "object",
      "properties": {
        "Start": {
          "type": "string",
          "description": "Starting location of the trip"
        },
        "End": {
          "type": "string",
          "description": "Destination of the trip"
        },
        "Date": {
          "type": "string",
          "format": "date",
          "description": "Date of the trip in YYYY-MM-DD format"
        },
        "Details": {
          "type": "object",
          "properties": {
            "Transportation": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "Mode": {
                    "type": "string",
                    "description": "Mode of transportation (Flight, Train, Road, etc.) If any one of the transportation options is not available give N/A but always give three array elements for 3 transportation options"
                  },
                  "Details": {
                    "type": "object",
                    "properties": {
                      "Booking": {
                        "type": "string",
                        "description": "Booking information and platforms"
                      },
                      "Cost": {
                        "type": "number",
                        "description": "Estimated cost"
                      },
                      "Duration": {
                        "type": "string",
                        "description": "Duration of the journey"
                      },
                      "DepartureTime": {
                        "type": "string",
                        "description": "Departure time"
                      },
                      "ArrivalTime": {
                        "type": "string",
                        "description": "Arrival time"
                      },
                      "DepartureLocation": {
                        "type": "string",
                        "description": "Departure location"
                      },
                      "ArrivalLocation": {
                        "type": "string",
                        "description": "Arrival location"
                      },
                      "AdditionalInfo": {
                        "type": "string",
                        "description": "Any additional information related to the transportation"
                      }
                    },
                    "required": ["Booking", "Cost", "Duration", "DepartureTime", "ArrivalTime", "DepartureLocation", "ArrivalLocation"]
                  }
                },
                "required": ["Mode", "Details"]
              }
            },
            "Accommodation": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "Name": {
                    "type": "string",
                    "description": "Name of the accommodation"
                  },
                  "Type": {
                    "type": "string",
                    "description": "Type of accommodation (Hotel, Airbnb, Hostel, etc.)"
                  },
                  "CheckInDate": {
                    "type": "string",
                    "format": "date",
                    "description": "Check-in date in YYYY-MM-DD format"
                  },
                  "CheckOutDate": {
                    "type": "string",
                    "format": "date",
                    "description": "Check-out date in YYYY-MM-DD format"
                  },
                  "CostPerNight": {
                    "type": "number",
                    "description": "Cost per night"
                  },
                  "TotalCost": {
                    "type": "number",
                    "description": "Total cost for the stay"
                  },
                  "Address": {
                    "type": "string",
                    "description": "Address of the accommodation"
                  },
                  "ContactInfo": {
                    "type": "string",
                    "description": "Contact information for the accommodation"
                  },
                  "AdditionalInfo": {
                    "type": "string",
                    "description": "Any additional information related to the accommodation"
                  }
                },
                "required": ["Name", "Type", "CheckInDate", "CheckOutDate", "CostPerNight", "TotalCost", "Address", "ContactInfo"]
              }
            },
            "Activities": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "Name": {
                    "type": "string",
                    "description": "Name of the activity"
                  },
                  "Date": {
                    "type": "string",
                    "format": "date",
                    "description": "Date of the activity in YYYY-MM-DD format"
                  },
                  "Time": {
                    "type": "string",
                    "description": "Time of the activity"
                  },
                  "Location": {
                    "type": "string",
                    "description": "Location of the activity"
                  },
                  "Cost": {
                    "type": "number",
                    "description": "Cost of the activity"
                  },
                  "Booking": {
                    "type": "string",
                    "description": "Booking information and platforms"
                  },
                  "AdditionalInfo": {
                    "type": "string",
                    "description": "Any additional information related to the activity"
                  }
                },
                "required": ["Name", "Date", "Time", "Location", "Cost", "Booking"]
              }
            },
            "Budget": {
              "type": "object",
              "properties": {
                "Currency": {
                  "type": "string",
                  "description": "Currency of destination full name and sign"
                },
                "FlightCost": {
                  "type": "number",
                  "description": "Estimated cost of flights"
                },
                "AccommodationCost": {
                  "type": "number",
                  "description": "Estimated cost of accommodation"
                },
                "FoodCost": {
                  "type": "number",
                  "description": "Estimated cost of food"
                },
                "ActivitiesCost": {
                  "type": "number",
                  "description": "Estimated cost of activities"
                },
                "TotalCost": {
                  "type": "number",
                  "description": "Total estimated cost of the trip"
                }
              },
              "required": ["FlightCost", "AccommodationCost", "FoodCost", "ActivitiesCost", "TotalCost"]
            },
            "PackingList": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "Items to pack for the trip"
              }
            },
            "Notes": {
              "type": "string",
              "description": "Additional notes or recommendations for the trip"
            }
          },
          "required": ["Transportation", "Accommodation", "Activities", "Budget", "PackingList"]
        }
      },
      "required": ["Start", "End", "Date", "Details"]
    }
  `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text =  response.text(); // Await the text() method since it returns a promise
  const data = JSON.parse(text);
  
  return data;
}
