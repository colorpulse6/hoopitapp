import React from 'react';
import {
    
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import { formRelative } from "date-fns";

// import usePlacesAutoComplete, {
//     getGeocode,
//     getLatLng,
// } from "use-places-autocomplete";

// import {
//     Combobox,
//     ComoboboxInput,
//     ComboboxList,
//     ComboboxOption,
// } from "@reach/combobox";
import "@reach/combobox/styles.css";

//Import styles
import mapStyles from "./mapStyles"


//PROPS VARIABLES
const libraries = ["places"]
const mapContainerStyle = {
    width: '100vw', 
    height: '100vh'
}



export default function Map() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    const center = {
        lat: 52.5200,
        lng: 13.4050,
    }
    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
    }
   

    return <div>
    
        <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        ></GoogleMap>

    </div>
}