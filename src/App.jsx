import { useState, useEffect } from 'react'
import parisOlympicsLogo from './assets/2024_Summer_Olympics_logo.svg.png'
import './App.css'
import { Client } from "@gradio/client"
import CountryButton from './CountryButton'

function App() {

  async function queryModel(country, medalType) {
    const client = await Client.connect("kairuken/paris2024_medal_prediction");
    var result = await client.predict("/predict", { 		
        medal_type: medalType.trim(), 		
        country: country.trim(), 
    });
  
    result = result.data[0].replace('[','').replace(']', '')
    setPredictedMedal(parseInt(result));
  }
  const [countryList, setCountryList] = useState([])
  const [countrySelected, setCountrySelected] = useState("United States of America")
  const [medalTypeSelected, setMedalTypeSelected] = useState("Gold")
  const [predictedMedal, setPredictedMedal] = useState(0)
 
  useEffect(() => {
    //Change back to public\country_list.txt when running locally
    fetch("/country_list.txt")
    .then(function (res) {
        return res.text();
    })
    .then(function (data) {
        setCountryList(data.split("\n"));
    });
  }, [])

  return (
    <>
      <div>
        <a href="https://olympics.com/en/paris-2024" target="_blank">
          <img src={parisOlympicsLogo} className="logo" alt="Paris Olympics logo"/>
        </a>
      </div>
      <h1>Paris 2024 Olympics Prediction Model</h1>
      <p>Linear regression model trained on Summer Olypmics 2000 to 2020 data.</p>
      <a href="https://www.kaggle.com/code/kairuken/paris-predictor-v2">Link to Kaggle notebook where model was coded</a>
      <div className="card">
        <button onClick={() => queryModel(countrySelected, medalTypeSelected)}>
          Get Predictions
        </button>
        <h2>Current Selections</h2>
        <p>Country: {countrySelected}</p>
        <p>Medal Type: {medalTypeSelected}</p>
        <h4>{predictedMedal ? predictedMedal : ""} Medals Predicted</h4>
        <h3>Select Medal Type</h3>
        <button onClick={() => setMedalTypeSelected("Gold")}>Gold</button>
        <button onClick={() => setMedalTypeSelected("Silver")}>Silver</button>
        <button onClick={() => setMedalTypeSelected("Bronze")}>Bronze</button>
        <h3>Select Country</h3>
        {countryList.map((item) => (
          <CountryButton key={item} countryName={item} selectCountryFunction={() => setCountrySelected(item)}/>
        ))}
      </div>
    </>
  )
}

export default App
