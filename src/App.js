import React, { useState, useEffect } from 'react';
import './App.css';
import background from "./img.png";

function WeatherComponent() {

  const [data, setData] = useState([]);


  useEffect(() => {

    var myHeaders = new Headers();
    myHeaders.append("X-API-Key", "WEATHER_API_KEY");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("https://api.checkwx.com/taf/klns/decoded", requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setData(data.data || []);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  }, []);

  return (
      <div style={{
          backgroundImage: `url(${background})` ,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'fill',
      }}><h1>TAF and SIGMET Weather</h1>
          <ul>
              {data.map((item, index) => (
                  <li key={index}>
                  <strong>{item.type}</strong>: {item.raw_text}
                  </li>
              ))}
          </ul>
      </div>
  );
}

export default WeatherComponent;


