import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import graphicSvg from '../svg/graphic.svg'
import graphicPng from '../images/graphic.png'
import placeIcon from '../svg/fbPlacesBlue.svg'
import { Link } from 'react-router-dom';
import MainTemperaturePanel from '../components/MainTemperaturePanel';
import WeatherFactorCard from '../components/WeatherFactorCard';
import DailyForecastCard from '../components/DailyForecastCard';
import axios from 'axios';

export default function MainScreen(props) {
  const [cityWeatherData, setCityWeatherData] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);

  //save selected city received from route
  let { city } = useParams();

  //save current weather data for selected city from all current weather data passed from App.js
  useEffect(() => {
    if(props !== null && city !== null){
      props.weatherData.map(item =>{
        if(item.name === city){
          setCityWeatherData(item);
        }
        return null;
      })
    }
  }, [props, city])

  //fetch daily forecast data for selected city
  useEffect(() => {
    async function getWeatherForecast(){
      axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + 
      cityWeatherData.coord.lat +'&lon='+ cityWeatherData.coord.lat +
      '&units=metric&exclude=current,minutely,hourly&appid=b974d3b0abf935ba853c015b90b0f0f2')
        .then(response => {
          setDailyForecast(response.data);
        });
    }
    if(cityWeatherData !== null){
      getWeatherForecast();
    }
  }, [cityWeatherData])

  function getCountryName(code){
    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    return regionNames.of(code);
  }

  function getFormatedDate(timestamp){
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let date = new Date(timestamp * 1000);

    return days[date.getDay()] + ", " + date.getDate() + " " 
    + months[date.getMonth()] + " " + date.getFullYear() + " | "
    + date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }

  function getFormatedTime(timestamp){
    let date = new Date(timestamp * 1000);
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }

  return (
    <div className="flex flex-col bg-blue-200 w-screen h-screen sm:pb-8">
      {/* render backround 
      resolution < sm render png background 
      resolurion > sm render svg backround*/}
      <img src={graphicPng} className="block sm:hidden z-0 w-screen" alt="graphic" />
      <img src={graphicSvg} className="hidden sm:block z-0 w-screen fixed" alt="graphic" />

      <div className="z-50 flex flex-col bg-gray-50 h-full sm:h-auto rounded-t-2xl sm:rounded-b-2xl w-screen max-w-xl -mt-12 sm:mt-12 shadow-2xl self-center">
        {cityWeatherData !== null && dailyForecast !== null ?(
        <div>
          <div className="inline-flex w-full justify-between text-gray-500 text-sm">
            {/* render date with last weather update */}
            <div className="flex w-auto px-2 py-3 text-center font-body text-sm">{getFormatedDate(cityWeatherData.dt)}</div>
            {/* render button with actual city and country. Route to SearchScreen */}
            <Link className="flex bg-blue-100 text-blue-500 font-body text-base font-normal w-auto px-4 py-3 rounded-tr-xl rounded-bl-xl" to="/">
              {cityWeatherData.name}, {getCountryName(cityWeatherData.sys.country)}
              <img src={placeIcon} className=" ml-1" alt="place" />
            </Link>
          </div>
          {/* render main weather panel with actual, min, max temperatures and weather state */}
          <div className="flex w-full justify-center mt-8">
            <MainTemperaturePanel weatherData={cityWeatherData}/>
          </div>
          {/* render panels with weather factors */}
          <div className="mt-8">
            <div className="grid grid-cols-3 gap-4 w-full px-8 place-items-center">
              <div className=""><WeatherFactorCard type="Humidity" value={cityWeatherData.main.humidity} unit="%"/></div>
              <div className=""><WeatherFactorCard type="Pressure" value={cityWeatherData.main.pressure} unit="mBar"/></div>
              <div className=""><WeatherFactorCard type="Wind" value={cityWeatherData.wind.speed} unit="km/h"/></div>
              <div className=""><WeatherFactorCard type="Sunrise" value={getFormatedTime(cityWeatherData.sys.sunrise)}/></div>
              <div className=""><WeatherFactorCard type="Sunset" value={getFormatedTime(cityWeatherData.sys.sunset)}/></div>
              <div className=""><WeatherFactorCard type="Daytime" value={"IDK:D"}/></div>
            </div>
          </div>
          {/* render daily forecast for 3 days */}
          <div className="my-8">
            <div className="grid grid-cols-3 gap-2 w-full px-8 place-items-center">
            <div className="shadow-xl w-full h-28 rounded-2xl bg-white"><DailyForecastCard dailyData={dailyForecast.daily[1]} /></div>
            <div className="shadow-xl w-full h-28 rounded-2xl bg-white"><DailyForecastCard dailyData={dailyForecast.daily[2]} /></div>
            <div className="shadow-xl w-full h-28 rounded-2xl bg-white"><DailyForecastCard dailyData={dailyForecast.daily[3]} /></div>
            </div>
          </div>
        </div>
        ):(
        //loadig spinner
        <div className=" flex justify-center items-center py-14">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
        )}
      </div>
    </div>
  )
}
