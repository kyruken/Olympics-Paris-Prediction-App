import './App.css'

function CountryButton({countryName, selectCountryFunction}) {
  return (
    <>
        <button onClick={() => selectCountryFunction()}>{countryName}</button>
    </>
  )
}

export default CountryButton