
import axios from "axios"
import dotenv from 'dotenv';
dotenv.config();


export async function CountryNames(){
    const response =await axios.get(`https://restcountries.com/v3.1/all?fields=name`)
    return(
        response.data
    )
}