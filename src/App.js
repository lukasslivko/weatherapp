import './App.css';
import SearchScreen from './screens/SearchScreen';
import MainScreen from './screens/MainScreen';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Switch, Route} from 'react-router-dom';

function App() {

  const[weatherData, setWeatherData] = useState([]);
  const[cities] = useState(["Bratislava" , "Humenné" , "Koromľa" , "Košice" , "Michalovce", "Sobrance"]);

  //fetch current weather data for all cities
  useEffect(() => {
    async function getWeatherDataByCity(city){
      axios.get('https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid=b974d3b0abf935ba853c015b90b0f0f2')
        .then(response => {
          setWeatherData(weatherData => [...weatherData, response.data]);
        });
    }
    cities.map(item => {
      getWeatherDataByCity(item);
      return null;
    })
  }, [cities])

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <SearchScreen weatherData={weatherData}/>
        </Route>
        <Route path="/:city">
          <MainScreen weatherData={weatherData}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
