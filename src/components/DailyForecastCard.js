import React, { useEffect, useState } from 'react'
import arrowUp from '../svg/arrowup.svg'
import arrowDown from '../svg/arrowdown.svg'

export default function DailyForecastCard(props) {

  const [dailyForecast, setDailyForecast] = useState(null);

  useEffect(() => {
    if(props !== null){
      setDailyForecast(props.dailyData);
    }
  }, [props])

  function getFormatedDate(timestamp){
    var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    let date = new Date(timestamp * 1000);

    return days[date.getDay()] + ", " + date.getDate();
  }

  return (
    dailyForecast !== null ? (
      <div className="flex flex-col justify-center w-full h-full">
        <div className="flex justify-center">
          {/* render icon of forecasted weather state from open weather api */}
          <img src={"https://openweathermap.org/img/wn/"+ dailyForecast.weather[0].icon +".png"} alt="weather" />
        </div>
        {/* render date */}
        <div className="flex justify-center font-body font-medium">{getFormatedDate(dailyForecast.dt)}</div>
        <div className="flex justify-center">
          {/* render max, min temperature */}
          <div className="inline-flex font-body font-thin justify-center text-xs pr-1">
            {parseInt(dailyForecast.temp.max)}&deg;C
            <img src={arrowUp} className="ml-1" alt="arrowUp" style={{width: '5px', height: '16px'}}/>
          </div>
          <div className="inline-flex font-body font-thin justify-center text-xs">
            {parseInt(dailyForecast.temp.min)}&deg;C
            <img src={arrowDown} className="ml-1" alt="arrowUp" style={{width: '5px', height: '16px'}}/>
          </div>
        </div>
      </div>
    ):(null)
    
  )
}
