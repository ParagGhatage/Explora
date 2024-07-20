
import axios from "axios"


export const Id = async(Lat:number =0,Lon:number=0) => {

    const key = process.env.NEXT_PUBLIC_WEATHER_API_KEY
    const CityData:any = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${Lat}&lon=${Lon}&limit=1&appid=${key}`)
    const Cityname = CityData.data[0].name
    if(CityData){
    const data = await axios.post("/api/GetCityId",{name:Cityname})
    console.log(data.data[0].id)
    return data.data[0].id
}
else{
    return null
}
}