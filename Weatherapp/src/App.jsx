import './App.css';
import {useEffect, useState} from 'react';


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [geoLoc, setgeoLoc] = useState({ latitude:0, longitude:0});

  useEffect(() => {
    setIsLoading(true);

    if(!navigator.geolocation){
      window.alert( "Oups, pas de localisation trouvée. Activez la géolocalisation!");
    }

    getGeolocalisation();
  }, []);
 
  const getGeolocalisation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setgeoLoc ({ 
          latitude:position.coords.latitude, 
          longitude:position.coords.longitude,
        });
      }, 
      () => {
        setError(true);
      }
    ); 
  };

};

  // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
  return <h2 className="bg-slate-600 text-xl text-white"> TEST</h2>
  
}

export default App
