import React, { useEffect, useState } from 'react'
import { getEmojis } from './getEmojis';
import axios from "axios";


const WeekDay = ({data, weatherUnits}) => {
  const [weatherEmojis, setWeatherEmojis] = useState("");
  const [averageTemperature,setAverageTemperature] = useState (0);

  useEffect(() => {
    if (!data) return;
    const avTemp = ((data.temperature_2m_max + data.temperature_2m_min)/2).toFixed(1);

    const weatherEmojis = getEmojis(avTemp, data.precipitation_sum, data.windspeed_10m_max);

    setAverageTemperature (avTemp);
    setWeatherEmojis (weatherEmojis);
  }, [data]);

  if (!data || !weatherUnits){
    return <div> Erreur</div>;
  }

  return (
    <div>
      <p>{data.jour}</p>
      <p> {averageTemperature} <span> {weatherUnits.temperature}</span>
      </p>
      <div>
        {weatherEmojis && <div>{weatherEmojis}</div>}
        </div>
    </div>
  )
};

export default WeekDay;