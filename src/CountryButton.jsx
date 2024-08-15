import './App.css'
import countryListFile from "../src/country_list.txt"

function CountryButton({countryName, selectCountryFunction}) {
  return (
    <>
        <button onClick={() => selectCountryFunction()}>{countryName}</button>
    </>
  )
}

export default CountryButton