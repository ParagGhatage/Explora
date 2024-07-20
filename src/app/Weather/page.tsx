
import {WeatherWidget} from "@/components/Weather/WeatherWidget";
import { WeatherWidget1 } from "@/components/Weather/NewWeatherWidget";
import { MobileViewStart } from "@/components/Weather/MobileViewStart";
import { MobileViewEnd } from "@/components/Weather/MobileViewEnd";

export default function Page(){
    return(
    <div className="mt-40 ">
        <div className="items-center">
        <MobileViewStart/>
        <MobileViewEnd/>
        </div>
        
             <WeatherWidget/>
             <WeatherWidget1/>
    </div>
       
    )
}