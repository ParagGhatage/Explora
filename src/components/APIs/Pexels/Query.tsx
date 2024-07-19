
import axios from "axios"
import dotenv from 'dotenv';
dotenv.config();


export async function PexelsQuery(Country:String){

    const response =await axios.get(`https://api.pexels.com/v1/search?query=${Country}&per_page=15`
        , {
            headers: {
            Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY
            }
        }
    )
    console.log(response)
    return(
        response.data
    )
}