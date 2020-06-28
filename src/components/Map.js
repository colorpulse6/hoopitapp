import React from 'react';
import '../App.css';
import bball from './b-ball.png'

import {
    
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import { formRelative, formatRelative } from "date-fns";

import usePlacesAutoComplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

//Import styles
import mapStyles from "./mapStyles"


//PROPS VARIABLES
const libraries = ["places"]

const mapContainerStyle = {
    width: '100vw', 
    height: '100vh'
    
}
const styles = { width: '100%', height: '100%', position: 'absolute'};



export default function Map(props) {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    //MARKER HOOKS (SET STATE)
    const [markers, setMarkers] = React.useState([])
    const [selected, setSelected] = React.useState(null);

    const onMapClick = React.useCallback((event) => {
        console.log(event)
        //Get Markers on Click
        setMarkers(current => [
            ...current, 
            {
                lat:event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date()
        },
    ]);
    }, []);

    //RETAIN STATE WITHOUT CAUSING RERENDERS
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    //PAN TO LAT AND LONG OF INPUT
    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    }, []);

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
   
    const user =  props.loggedInUser.username

    return <div className="front-page-map-conatiner">
    
        <Search panTo={panTo}/>
        <Locate panTo={panTo}/>

        <GoogleMap 
            styles={styles}
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={center}
            options={options}
            onClick={onMapClick}
            onLoad={onMapLoad}
        >
            {markers.map((marker => <Marker 
                key={marker.time.toISOString} 
                position={{lat: marker.lat, lng: marker.lng}} 
                icon={{
                    url: bball,
                    scaledSize: new window.google.maps.Size(30, 30),
                    origin: new window.google.maps.Point(0,0),
                    anchor: new window.google.maps.Point(15,15)
                }}
                onClick={() => {
                    setSelected(marker)

                }}
            />
            ))}

            {selected ? (
                <InfoWindow position={{lat:selected.lat, lng:selected.lng}} onCloseClick={() =>{setSelected(null)}}>
            
                <div>
                    <h2>Game</h2>
                    <p>Marked by {user}</p>
                    <p>Marked at {formatRelative(selected.time, new Date())}</p>
                </div>
            </InfoWindow>) : null}
        </GoogleMap>

    </div>
}

function Locate({panTo}) {
    return <button className="locate-btn" onClick={() => {
        navigator.geolocation.getCurrentPosition((position)=> {
            panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        }, 
        () => null
        );
    }}>
                <img src={bball}></img>
            </button>
}

function Search({ panTo }) {
    //API HOOK
    const {
        ready, 
        value, 
        suggestions: {status, data}, 
        setValue, 
        clearSuggestions
    } = usePlacesAutoComplete({
        requestOptions: {
            location: {lat: () => 52.5200, lng: () => 13.4050 },
            radius: 200 * 1000,
        },

    });
        
    return (
    <div className="map-search">
        <Combobox 
            onSelect = {async (address) => {
                //UPDATE STATE
                setValue(address, false);
                clearSuggestions();
                
                try {
                    const results = await getGeocode({address})
                    //GET LAT AND LNG FROM INPUT
                    const {lat, lng } = await getLatLng(results[0]);
                    //PAN TO INPUT
                    panTo({ lat, lng })
                    console.log(lat, lng)
                } catch (err){
                    console.log(err + 'ERROR!')
                }
                // console.log(address);
        }}
        >

            <ComboboxInput 
                value={value} 
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                disabled={!ready} 
                placeholder = "Enter an address"

            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === 'OK' && 
                        
                    data.map(({id, description}) => ( <ComboboxOption key={id} value={description}/>
                    ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>

    </div>
    )
}