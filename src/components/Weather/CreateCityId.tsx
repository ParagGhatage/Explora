
import axios from "axios"
import dbConnect from "@/lib/dbConnect"
import  CityModel  from "@/models/city.model"

export const Id = async(Lat:number =0,Lon:number=0) => {

    const key = process.env.NEXT_PUBLIC_WEATHER_API_KEY

    const CityData:any = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${Lat}&lon=${Lon}&limit=1&appid=${key}`)
    const Cityname = CityData.data[0].name
    console.log(CityData.data[0].name)

    
   
    

}