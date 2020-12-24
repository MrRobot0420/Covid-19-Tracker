import React from "react";
import { MapContainer as LeafletMap, TileLayer,useMap} from "react-leaflet";
import {showDataOnMap} from "./util"
import "./Map.css";

function Map({countries, caseType, center, zoom}) {
  

 function MyComponent() {
const map = useMap();
map.flyTo(center,zoom);
  return null

}


  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        //   attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <MyComponent/>
        {showDataOnMap(countries, caseType)}
      </LeafletMap>
    </div>
  );
}

export default Map

