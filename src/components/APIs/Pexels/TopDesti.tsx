import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

export async function TopDesti(Country: string) {
    try {
        const response = await axios.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent('top destinations in the world')}&per_page=5`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_PEXELS_API_KEY}`
            }
        });

        console.log(response.data); // Log the entire response data for inspection

        // Example structure of accessing data, adjust as per the actual API response structure
        const firstResult = response.data.photos[0]; // Example: Accessing first photo object
        const firstPhotoUrl = firstResult.src.original; // Example: Accessing original photo URL

        return firstPhotoUrl;
    } catch (error) {
        console.error("Error fetching top destinations:", error);
        throw error; // Handle or rethrow the error as needed
    }
}
