
import axios from "axios"
import dotenv from 'dotenv';
dotenv.config();


export async function TopDesti(Country:String){
    
    const response =await axios.get(`https://api.pexels.com/v1/search?query=top destinations in the world`
        , {
            headers: {
            Authorization: process.env.PEXELS_API_KEY
            }
        }
    )
    console.log(response)
    return(
        response.candidates[0].content.parts[0].text
    )
}