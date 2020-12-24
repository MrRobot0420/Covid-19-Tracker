import './App.css';
import React,{useState,useEffect} from "react";
import {MenuItem, FormControl ,Select ,Card, CardContent} from '@material-ui/core';
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import {sortData, prettyPrintStat} from "./util"
import Line from "./LineGraph";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";

function App() {
    const [countries,setCountries] = useState([])
    const [mapCountires,setMapCountries] = useState([])
    const [country,setCountry] = useState('worldwide')
    const [countryInfo,setCountryInfo] = useState({})
    const [tableData,setTableData] = useState([])
    const [casesType, setCasesType] = useState("cases");
    const [mapCenter,setMapCenter] = useState( [22.253116,22.112647]);
    const [mapZoom,setMapZoom] = useState(2);

    useEffect(() => {
      fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
  

    useEffect(() => {
    const getCountriesData = async () => {
      const res = await fetch('https://disease.sh/v3/covid-19/countries')
      res.json()
      .then(data => {
        const countries = data.map(country => ({
          name : country.country,
          value: country.countryInfo.iso2
        }))
        const sortedData = sortData(data);
        console.log(data);
        setTableData(sortedData);
        setCountries(countries);
        setMapCountries(data);
        // console.log(countries); fetching country name for drop down list 
      })
    }
    
    getCountriesData()
    },[])


  const onCountryChnage = async (e) => {
    e.preventDefault();
    const countryCode = e.target.value;
    
    const url = countryCode === "worldwide" 
    ? 'https://disease.sh/v3/covid-19/all'
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(res => res.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data)
      if(countryCode === "worldwide"){
        setMapCenter([34.80746,-40.4796 ])
            setMapZoom(2)
      } else {
        setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
            setMapZoom(4.5)
      }
    })
    // handleLocation();
  }


  return (

    <div className="app">
      <div className="app__left">
        <div className="app__header">
        <h1 className="app__title">COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select 
          variant="outlined"
          value={country}
          onChange={onCountryChnage}
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
              {
              countries.map((country) => {
                return <MenuItem value={country.value}>{country.name}</MenuItem>
              }
              )}
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
              <InfoBox 
              onClick = {(e) => setCasesType("cases")}
              title="Covid Cases" 
              active={casesType === "cases"}
              cases={prettyPrintStat( countryInfo.todayCases)} 
              total={numeral( countryInfo.cases ).format("0.0a")} 
              isRed
              />

              <InfoBox 
              onClick = {(e) => setCasesType("recovered")}
              title="Recovered" 
              active={casesType === "recovered"}
              cases={prettyPrintStat(countryInfo.todayRecovered)} 
              total={numeral(countryInfo.recovered).format("0,0a")} 
              isGreen
              />

              <InfoBox 
              onClick = {(e) => setCasesType("deaths")}
              title="Deaths" 
              active={casesType === "deaths"}
              cases={prettyPrintStat(countryInfo.todayDeaths)} 
              total={numeral(countryInfo.deaths).format("0,0a")}
              isOrange
              />

      </div>

      <Map 
      countries ={mapCountires}
      caseType={casesType}
      center={mapCenter}
      zoom={mapZoom}
      />
      </div>

        <Card className="app__right">
          <CardContent>
            <div className="app__information">
          <h2>Live cases by country</h2>
          <Table countries={tableData}/>


          <h2 className="app__graphTitle">World new cases</h2>
          <Line className ="app__graph" caseType={casesType}/>
            </div>

        </CardContent>
         </Card>
    </div>

  )

}

export default App;
