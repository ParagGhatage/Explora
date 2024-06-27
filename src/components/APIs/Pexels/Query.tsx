import axios from "axios"


export async function PexelsQuery(Country:String){
    const response = axios.get(`https://api.pexels.com/v1/search?query=${Country}&per_page=5`
        , {
            headers: {
                'Authorization': process.env.PEXELS_API_KEY
            }
        }
    )
    return(
        response
    )


}
