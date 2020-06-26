import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/index.min.css';

export default class Home extends React.Component {
    
    render(){

        

        return(
            <div>
            <GooglePlacesAutocomplete
      onSelect={console.log}
      apiKey="AIzaSyDJ_D47clTFho3rq8csXDFz3Fie4GmHGxY"
    />
            
            </div>
        )

    }
    
}
