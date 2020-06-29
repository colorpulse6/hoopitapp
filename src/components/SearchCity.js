import React from 'react';

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


export default function SearchCity({ panTo }) {
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
                    console.log(value)
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