import React, { useEffect, useState } from 'react'
import graphicSvg from '../svg/graphic.svg'
import graphicPng from '../images/graphic.png'
import placeIcon from '../svg/fbPlaces.svg'
import { Link } from 'react-router-dom';

export default function SearchScreen(props) {

  const [filteredWeatherData, setFilteredWeatherData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  //save passed current weather data from App.js via props
  useEffect(() => {
    if(props !== null){
      setFilteredWeatherData(props.weatherData);
      setWeatherData(props.weatherData);
    }
  }, [props])

  //filter current weather data by input
  function handleSearch(value){
    let filter = [];
    weatherData.map(item => {
      if(item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())){
        filter.push(item)
      }
      return null;
    })
    setFilteredWeatherData(filter);
  }

  //function render filtered data and display cities with current temperature
  function getFilteredCities(){
    return(
      filteredWeatherData.map((item, index) =>(
        //Link redirect to MainScreen with paramater about selected city
        <Link className="flex flex-row justify-between px-10 font-body text-lg pb-1" key={index} to={"/"+ item.name}>
          <div>
            {item.name}
          </div>
          <div className="font-light text-gray-500">
            {parseInt(item.main.temp)} &deg;C
          </div>
        </Link>
        ))
    )
  }
  return (
    <div className="flex flex-col bg-blue-200 w-screen h-screen">
      {/* render backround 
      resolution < sm render png background 
      resolurion > sm render svg backround*/}
      <img src={graphicPng} className="block md:hidden z-0 w-screen fixed" alt="graphic" />
      <img src={graphicSvg} className="hidden md:block z-0 w-screen fixed" alt="graphic" />
     
      {/* input form for filtering cities */}
      <div className="z-50 flex flex-col bg-gray-50 h-full sm:h-auto rounded-t-2xl sm:rounded-b-2xl w-screen max-w-xl  mt-12 shadow-2xl self-center">
        <div className="flex w-full justify-center py-8 font-body text-gray-400">Location</div>
        <div className="flex w-full justify-center">
          <div className="relative text-gray-600 w-full mx-8">
            <input type="search" name="serch" placeholder="Search city..." 
            className="flex bg-gray-200 h-10 w-full px-5 pr-10 rounded-sm italic font-body focus:outline-none"
            onChange={e => handleSearch(e.target.value)}/>
            <img src={placeIcon} className="absolute right-0 top-0 mt-3 mr-4" alt="place" />
          </div>
        </div>
        {/* render filtered cities */}
        <div className="flex flex-col w-full my-8">
          {filteredWeatherData !== null ? 
          (getFilteredCities()):
          (
            //loadig spinner
          <div className=" flex justify-center items-center py-14">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
