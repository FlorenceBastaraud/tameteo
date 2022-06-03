import React, {useState} from 'react';
import './App.css';

function App() {

  const apiKey = 'de18f3db68b69eb99c4356057a130b96';
  const [donneesMeteo, setDonneesMeteo] = useState([{}]);
  const [ville, setVille] = useState("");


  const getMeteo = (event) => {
    if (event.key == "Enter"){
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&lang=fr&units=metric&APPID=${apiKey}`).then(
        response =>response.json()
      ).then(
        data => {
          setDonneesMeteo(data);
          setVille("");
        }
      );

    }
  }

  return (
    <div className='container'>
    <h1 className='titre'>Tameteo</h1>

   


    <input className='input'
    placeholder='Tapez ici ...'
    onChange={e => setVille(e.target.value) }
    value ={ville}
    onKeyPress={getMeteo}
    />

  {typeof donneesMeteo.main === 'undefined' ? (
      <div className='bienvenue'>
        <p><strong>A votre service !</strong></p>
        <p>Nous te donnons les données Météo de la ville de ton choix... <i>Illico presto!</i></p>
        </div>
        ) : (
        <div className='bienvenue bienvenueSp'>
          <p id='ville'>{donneesMeteo.name}</p>
          <p>{Math.round(donneesMeteo.main.temp)}°C</p>
          <p id='description'>{donneesMeteo.weather[0].description}</p>
        </div>
      )}

      {donneesMeteo.cod === '404' ? (
        <p className='bienvenue'>Ville inconnue :/</p>
      ) : (
        <>
        </>
      )}

      </div>
    )
}

export default App



