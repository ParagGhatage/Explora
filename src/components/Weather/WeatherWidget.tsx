"use client"
import React, { useEffect } from 'react'

interface Window {
    myWidgetParam?: any[];
  }

export function WeatherWidget() {
    const key = process.env.NEXT_PUBLIC_WEATHER_API_KEY
  useEffect(() => {
    // Create and append the D3.js script
    const d3Script = document.createElement('script');
    d3Script.src = '//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/d3.min.js';
    d3Script.async = true;
    document.body.appendChild(d3Script);

    // Create and append the weather widget generator script
    const widgetScript = document.createElement('script');
    widgetScript.async = true;
    widgetScript.charset = 'utf-8';
    widgetScript.src = '//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js';

    // Set up the widget parameters
    widgetScript.onload = () => {
        (window as Window).myWidgetParam = (window as Window).myWidgetParam || [];
        (window as Window)?.myWidgetParam?.push({
        id: 11,
        cityid: '1261731',
        appid: key,
        units: 'metric',
        containerid: 'openweathermap-widget-11',
      });
    };

    document.body.appendChild(widgetScript);

    // Clean up the scripts when the component unmounts
    return () => {
      document.body.removeChild(d3Script);
      document.body.removeChild(widgetScript);
    };
  }, []);

  return <div id="openweathermap-widget-11"></div>;
}
