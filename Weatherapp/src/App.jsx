import './App.css';
import {useEffect, useState,useCallback} from 'react';
import { formatWeatherDataDaily } from './components/formatWeatherDataDaily';
import WeekDay from './components/WeekDay';
import Today from './components/Today';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [geoLoc, setGeoLoc] = useState({ latitude:0, longitude:0});
  const [weatherUnits, setWeatherUnits]= useState({});
  const [weatherData, setWeatherData]= useState([]);
  
  const fetchWeather = useCallback(async(url) => {
    setError(false);

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log (data);

      if (Object.keys(data).length === 0){
        setError(true);
      } else {

        //formatted daily data
        const formattedDailyData= formatWeatherDataDaily(data.daily);
        setWeatherData (formattedDailyData)

        //unités
        setWeatherUnits({
          rain: data.daily_units.precipitation_sum,
          temperature: data.daily_units.temperature_2m_max,
          wind: data.daily_units.windspeed_10m_max,
        });
      }
    } catch (error) {}
  }, []);
    
  useEffect(() => {
    setIsLoading(true);

    if(!navigator.geolocation){
      window.alert("Oups, pas de localisation trouvée. Activez la géolocalisation!");
    }

    getGeolocalisation();

    fetchWeather (
      `https://api.open-meteo.com/v1/forecast?latitude=${geoLoc.latitude}&longitude=${geoLoc.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max&timezone=Europe%2FLondon`
      ).then (()=> setIsLoading(false));
    },[fetchWeather, geoLoc.latitude, geoLoc.longitude]);
    
  const getGeolocalisation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoLoc ({ 
          latitude:position.coords.latitude, 
          longitude:position.coords.longitude,
        });
      console.log(position)
      }, 
        () => {
        setError(true);
        }
    ); 
  };

  // si chargement
  if (isLoading) {
    return (
    <div className='min-h-screen h-max bg'>
      <p> Chargement...</p>
    </div>);
  }
  
  // si erreur
  if (error) {
    return (
    <div>
      <p> Une erreur est survenue...</p>
    </div>
    );
  }

  return <div className="bg-slate-600 text-xl text-white">
    <div>
      <Today data={weatherData[0]} weatherUnits = {weatherUnits} />
      <div> 
        {weatherData && 
          weatherData
            .slice (1, weatherData.length)
            .map ((data, index) => ( 
              <WeekDay key={index} data={data} weatherUnits = {weatherUnits}/>)
            )}

       
      </div>
    </div>
  </div>;
  
};

export default App;
