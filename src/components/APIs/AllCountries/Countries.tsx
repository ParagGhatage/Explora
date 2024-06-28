
import axios from "axios"
import dotenv from 'dotenv';
dotenv.config();


export async function CountryQuery(Country:String){
    const response =await axios.get(`https://restcountries.com/v3.1/name/${Country}?fullText=true`)
    return(
        response.data
    )
}