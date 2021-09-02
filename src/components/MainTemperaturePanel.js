import React, { useEffect, useState } from 'react'
import arrowUp from '../svg/arrowup.svg'
import arrowDown from '../svg/arrowdown.svg'

export default function MainTemperaturePanel(props) {

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if(props !== null){
      setWeatherData(props.weatherData);
    }
  }, [props])

  return (
    weatherData !== null ? (
      <div className="grid grid-cols-3 gap-4 w-full px-8 place-items-center">
        <div>
          <div>
            {/* render icon of current weather state from open weather api */}
            <img src={"https://openweathermap.org/img/wn/"+ weatherData.weather[0].icon +".png"} alt="place" />
          </div>
          <div className="flex w-full justify-center pb-4 font-body font-medium text-lg">
            {weatherData.weather[0].main}
          </div>
        </div>
        <div>
          <div className="flex w-full">
            {/* render current temperature */}
            <div className="text-6xl font-body">{parseInt(weatherData.main.temp)}</div>
            <div className="font-body font-medium text-2xl text-gray-500">&deg;C</div>
          </div>
        </div>
        <div>
          {/* render max, min temperature */}
          <div className="flex flex-col w-full">
            <div className="inline-flex justify-center mb-1 text-md font-body text-gray-500">
              {parseInt(weatherData.main.temp_max)}&deg;C
              <img src={arrowUp} className="" alt="arrowUp" style={{width: '5px', height: '16px'}}/>
            </div>
            <div className="inline-flex justify-center text-md font-body text-gray-500">
              {parseInt(weatherData.main.temp_min)}&deg;C
              <img src={arrowDown} className="mt-2" alt="arrowUp" style={{width: '5px', height: '16px'}}/>
            </div>
          </div>
        </div>
      </div>
    ):(<div>no data</div>)
  )
}






