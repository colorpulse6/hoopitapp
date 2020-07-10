import React from 'react';
import '../App.css';
import bball from '../images/b-ball.png'
import hoopitappLogo from '../images/hoopitapp-logo.png'

import SearchCity from './SearchCity'
import axios from 'axios'
import config from '../config';
import {Link} from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import nextButton from '../images/next-button.png'
import userImg from '../images/combined-shape-copy.png'
import dateImg from '../images/combined-shape.png'
import group2 from '../images/group-2.png'


import {
    
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
// import { formRelative, formatRelative } from "date-fns";

// import usePlacesAutoComplete, {
//     getGeocode,
//     getLatLng,
// } from "use-places-autocomplete";

// import {
//     Combobox,
//     ComboboxInput,
//     ComboboxPopover,
//     ComboboxList,
//     ComboboxOption,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";

//Import styles
import mapStyles from "./mapStyles"



//PROPS VARIABLES
const libraries = ["places"]

const styles = { width: '100%', height: '100%', position: 'absolute'};



export default function Map(props) {


    //RESPONSIVENESS
    

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1089px)'
  })
  const isMediumScreen = useMediaQuery({ query: '(min-width: 712px)' })
  const isSmallScreen = useMediaQuery({
    query: '(max-width: 768px)'
  })



  let mapContainerStyle;
  if(isDesktopOrLaptop){
    mapContainerStyle = {
        width: '80vw', 
        height: '100vh'
    }
  } else if (isMediumScreen){
    mapContainerStyle = {
        width: '80vw', 
        height: '75vh'
    }
  } else if (isSmallScreen){
    mapContainerStyle = {
        width: '80vw', 
        height: '45vh'
    }

  }
  

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    //MARKER HOOKS (SET STATE)
    const [markers, setMarkers] = React.useState([])
    const [selected, setSelected] = React.useState(null);

    const [games, setData] = React.useState({ hits: [] });
    const [user, setUser] = React.useState({});

    React.useEffect( () => {
        getUser()
      }, []);

      async function getUser() {
        const result = await axios(`${config.API_URL}/user`, {withCredentials: true})
          await result.data 
          setUser(result.data)
      }

    //COOL MAP CLICK FUNCTION
    // const onMapClick = React.useCallback((event) => {
    //     console.log(event)
    //     // Get Markers on Click
    //     setMarkers(current => [
    //         ...current, 
    //         {
    //             lat:event.latLng.lat(),
    //             lng: event.latLng.lng(),
    //             time: new Date()
    //     },
    // ]);
    
    // }, []);

    
        
     
    //RETAIN STATE WITHOUT CAUSING RERENDERS
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
        
        //GET GAMES FROM API

            axios.get(`${config.API_URL}/user-main`, {withCredentials: true})
              .then((games) => {
                //   SET GAMES IN HOOK STATE
                setData(games)
                games.data.map((game) => {
                    return setMarkers(current => [
                        ...current, 
                        {
                            lat: game.lat,
                            lng: game.lng,
                            time: new Date()
                    },
           
                ]);
                })
              })  

    }, []);

    //PAN TO LAT AND LONG OF INPUT
    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    const center = {
        lat: user.lat,
        lng: user.lng,
    }
    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
    }
        
    
    return <div className="front-page-map-container">

        {/* { games.data.map((game)=> {
            if(props.loggedInUser.username === game.createdBy){
                markerImage = hoopitappLogo
            } else {
                markerImage = bball
            }
        })
            
        } */}
        <div className="infoWindow">
        <SearchCity  panTo={panTo}/>
        </div>
        <Locate panTo={panTo}/>

        <div
            style={{
            width: "100%",
            marginLeft: 0,
        }}>
        <GoogleMap 
            styles={styles}
            mapContainerStyle={ mapContainerStyle }
            zoom={12}
            center={center}
            options={options}
            // onClick={onMapClick}
            onLoad={onMapLoad}
        >
            {markers.map((marker => <Marker 
                key={marker.time.toISOString} 
                position={{lat: marker.lat, lng: marker.lng}} 
                icon={{
                    url: bball,
                    scaledSize: new window.google.maps.Size(25, 25),
                    origin: new window.google.maps.Point(0,0),
                    anchor: new window.google.maps.Point(15,15)
                }}
                onClick={() => {
                    setSelected(marker)

                }}
            />
            ))}

            {selected ? (
                <InfoWindow  position={{lat:selected.lat, lng:selected.lng}} onCloseClick={() =>{setSelected(null)}}>
            
                <div>
                    
                    {games.data.map((game)=> {
                        
                        if(game.lat === selected.lat){
                            return <div className=" each-card card-text map-info">
                                    
                                    
                                    
                                                <p className="second-font"> <img src={userImg}></img> {game.createdBy}</p>
                                                <p className="second-font"> <img src={group2}></img> {game.location}</p>
                                                <p className="second-font"><img src={dateImg}></img> {game.date}</p>
                                                <Link to={props.loggedInUser.username === game.createdBy?`/${game._id}/admin`: `/game-detail/${game._id}`}>
                                                <button className="card-buttons">More info</button>
                                                </Link>
                                   
                                        
                                   </div>
                        }
                        
                    })}
                    {/* <p>Marked at {formatRelative(selected.time, new Date())}</p> */}
                </div>
            </InfoWindow>) : null}
        </GoogleMap>
        </div>
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
                {/* <img src={bball}></img> */}
            </button>
}

