import React, { useEffect, useState } from 'react'
import humidity from '../svg/humidity.svg'
import pressure from '../svg/pressure.svg'
import wind from '../svg/wind.svg'
import sunrise from '../svg/sunrise.svg'
import sunset from '../svg/sunset.svg'
import daytime from '../svg/sand-clock.svg'


export default function WeatherFactorCard(props) {

  const [type, setType]= useState(null);
  const [value, setValue]= useState(null);
  const [unit, setUnit]= useState(null);

  useEffect(() => {
    if(props !== null){
      setType(props.type);
      setValue(props.value);
      setUnit(props.unit);
    }
  }, [props])

  function getIcon(type){
    switch(type){
      case "Humidity":
        return humidity;
      case "Pressure":
        return pressure;
      case "Wind":
        return wind;
      case "Sunrise":
        return sunrise;
      case "Sunset":
        return sunset;
      case "Daytime":
        return daytime;
    default:
        console.log('Today only, 3 + 1 free!!');
    }
  }

  return (
    type !== null && value !== null && unit !== null? (
      <div className="flex-col">
      <div className="flex justify-center">
        <img src={getIcon(type)} className="" alt="humidity" />
      </div>
      <div className="flex justify-center font-body font-medium">
        {value}{unit}
      </div>
      <div className="flex justify-center font-body font-thin text-xs">
        {type}
      </div>
      
    </div>
    ):(null)
    
  )
}
