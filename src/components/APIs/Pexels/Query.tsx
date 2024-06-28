
import axios from "axios"
import dotenv from 'dotenv';
dotenv.config();


export async function PexelsQuery(Country:String){
    console.log('env',process.env.PEXELS_API_KEY)
    const response =await axios.get(`https://api.pexels.com/v1/search?query=${Country}`
        , {
            headers: {
            'Authorization':`UmWtqDY8aE6AuVhoy9EMMpgOIkRvP2P2VczlanEW0IpIFGbjxq7QqJ1r`
            }
        }
    )
    return(
        response.data
    )
}