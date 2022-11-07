import React, { FormEvent, useState } from 'react';
import './App.css';
const API_KEY = "d7364a8f3a1a4164821122010222703";
const API_BASE_URL = "https://api.weatherapi.com"
type WeatherData = {
  location: {
    region: string;
    name: string;
    country: string;
    tz_id: string;
    localtime_epoch: number;
  };
  current: {
    cloud: number;
    feelslike_c: number;
    last_updated: string;
    temp_c: number;
  };
}
type WeatherError = {
  error: {
    code: number;
    message: string;
  };
}
function App() {
  const [city, setCity] = useState<string>("İstanbul");
  const [data, setData] = useState<WeatherData>();
  const [error, setError] = useState<WeatherError>({
    error: {
      code: 0,
      message: 'no_error'
    }
  })
  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    // console.log(city)
    await fetch(`${API_BASE_URL}/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
      .then((res) => res.json())
      .then(res => {
        if(res['error'] != null) {
          return setError(res);
        }
        setError({
          error: {
            code: 0,
            message: 'no_error'
          }
        });
        return setData(res);
      })
    
    console.log(error);
    console.log(data);
  }
  return (
    <div className="App">
      <header className='App-header'>
        <h1>Custom Weather APP</h1>
        <form onSubmit={e => handleSubmit(e)}>
          <label htmlFor='city'>City </label>
          <input type="text" name='city' id='city' onChange={(e) => setCity(e.target.value)} />
          <button type='submit'>Search</button>
        </form>
        <div>
          {error.error.message == 'no_error' ? '' : 'Error! ' + error.error.message}
          {data ? 
          
          <>
            <div>
              Country: {data.location.country}  
            </div>
            <div>
              City: {data.location.name}  
            </div>
            <div>
              Timezone: {data.location.tz_id}  
            </div>
            <div>
              Feels Like: {data.current.feelslike_c}C
            </div>
            <div>
              Last Update: {data.current.last_updated}
            </div>
            <div>
              Temperature: {data.current.temp_c}C
            </div>
          </>
          
          : null}
        </div>
      </header>
    </div>
  );
}

export default App;
