import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import "./App.css";
import InfoBox from "./infoBox";
import Map from "./Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')

  // STATE = How to write a variable in react

  //USEEFFECT = runs a piece of code based on a given condition
  useEffect(() => {
    //the code inside here will run once when the component loads and not again
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country, //Full Name of Country
            value: country.countryInfo.iso2 //2 word code for country
          }
        ));

          setCountries(countries);
      });
    };
    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app__left">
        {/* Header */}
        {/* Title + Select Input dropdown field */}
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              {/* Loop through all the countries and show a drop down list of options */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        
        <div className="app__stats">
          {/* Info Boxs title = coronavirus cases*/}
          <InfoBox title="Coronavirus Cases" cases={123} total={2000} />
          {/* Info Boxs title = coronavirus recoveries*/}
          <InfoBox title="Recovered" cases={123} total={3000} />
          {/* Info Boxs title = coronavirus deaths*/}
          <InfoBox title="Deaths" cases={123} total={4000} />
          
        </div>
        {/* Map */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <h3>Worldwide new Cases</h3>
        </CardContent>
        {/* Table */}
        {/* Graph */}
      </Card>
    </div>
    
  );
}

export default App;
