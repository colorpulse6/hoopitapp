import React from "react";

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
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      location: { lat: () => 52.52, lng: () => 13.405 },
      radius: 200 * 1000,
    },
  });

  const inputStyles = {
    borderRadius: "0.25rem",
    border: "1px solid #ced4da",
    paddingLeft: "5px",
    fontFamily: "Nunito",
    fontSize: "1rem",
    fontWeight: "400",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.08",
    letterSpacing: "2.79px",
    color: "#818181",
  };

  return (
    <div className="map-search">
      <Combobox
        onSelect={async (address) => {
          //UPDATE STATE
          setValue(address, false);
          clearSuggestions();

          try {
            const results = await getGeocode({ address });
            //GET LAT AND LNG FROM INPUT
            const { lat, lng } = await getLatLng(results[0]);
            //PAN TO INPUT
            panTo({ lat, lng, address, value });
          } catch (err) {
            console.log(err + "ERROR!");
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            console.log(value);
          }}
          disabled={!ready}
          placeholder="Enter an address"
          style={inputStyles}
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
