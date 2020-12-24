import {Circle, Popup} from "react-leaflet";
import React from "react";
import numeral from "numeral"


const casesTypeColors = {
  cases: {
    color: "red",
    fillColor:"red",
    multiplier: 350,
  },
  recovered: {
      color: "#7dd71d",
    fillColor:"#7dd71d",
    multiplier: 350,
  },
  deaths: {
    color: "orange",
    fillColor:"orange",
    multiplier: 400,
  },
};



export const prettyPrintStat = (stat) => (
  stat ? `+${numeral(stat).format("0.0a")}` : "+0");

export const sortData = (data) =>{
    const sortedData = [...data]

    sortedData.sort((a,b) => a.cases>b.cases? -1: 1)

    return sortedData
}

export const buildChartData = (data, caseType="cases") => {
        const chartData = [] 
        let prevData;
        for(let date in data[caseType]) {
            if(prevData) {
                let newData = {
                    x:date,
                    y:data[caseType][date] - prevData
                }
                chartData.push(newData);
            }
            prevData = data[caseType][date]
        }
        return chartData;
}

export const showDataOnMap =  ((data, caseType='cases') => 
    data.map((country,i) => (
        <Circle
        key={i}
        center = {[country.countryInfo.lat,country.countryInfo.long]}
        fillOpacity ={0.4}
        // color ={casesTypeColors[caseType].hex}
        // fillColor = {casesTypeColors[caseType].hex}   
        pathOptions={casesTypeColors[caseType]}  
        radius = {
            Math.sqrt(country[caseType]) * casesTypeColors[caseType].multiplier
        }
        >
        <Popup>
        <div className="info-container">
            <div 
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
            <div className="info-name">{country.country}</div>
            <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
            <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
            <div className="info-deaths"> Deaths: {numeral(country.deaths).format("0,0")}</div>
        </div>
        </Popup>
        </Circle>

    )));

    
