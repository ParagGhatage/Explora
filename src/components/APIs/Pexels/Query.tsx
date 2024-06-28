
import axios from "axios"
import dotenv from 'dotenv';
dotenv.config();


export async function PexelsQuery(Country:String){
    console.log('env',process.env.PEXELS_API_KEY)
    const response =await axios.get(`https://api.pexels.com/v1/search?query=${Country}`
        , {
            headers: {
            Authorization: "n6IWtlmiwmMNB0KE78Yy3GQRypDd0ciFPNWGmImEPhHPVUyB8CAGTp1y"
            }
        }
    )
    console.log(response)
    return(
        response.data
    )
}