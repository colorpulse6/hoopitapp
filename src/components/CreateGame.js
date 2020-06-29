import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import config from '../config';
import Map from "./Map"
import '../App.css';
import SearchCity from './SearchCity'



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


export default class CreateGame extends React.Component {

    state = {
        teams: []
    }

    componentDidMount(){

        
        axios.get(`${config.API_URL}/teams`, {withCredentials: true})
            .then((res) => {
                this.setState({
                    teams: res.data,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    

    render() {
        
        if (!this.props.loggedInUser) {
            //REDIRECTS USER TO SIGN IN IF NOT LOGGED IN
            return <Redirect to='/sign-in' />
        }

    


        return(

            
            
            <div className="create-game-main">
            <h1>Create Game Page</h1>
            
            <form onSubmit={this.props.onAddGame}>
                    
                    <div className="form-group">
                        <label htmlFor="Date">Date</label>
                        <input type="date" className="form-control" name="date" id="date" required/>
                    </div>
    
                    <div className="form-group">
                        <label htmlFor="location">location</label>
                        {/* <input type="text" className="form-control" name="location" id="location" required/> */}
                        <div>
                            <SearchCity 
                            panTo={this.props.handleLocationInput}
                         
                        />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="maxPlayers">Max Players</label>
                        <input type="text" className="form-control" name="maxPlayers" id="maxPlayers" required/>
                    </div>
                    <div className="form-group">
                    <label for="team">Use a Team?</label>
                        <select name="team" id="team">
                            <option>No team selected</option>
                            {this.state.teams.map((team, index)=>{
                                if(this.props.loggedInUser.username === team.owner) { return <option key={index} value={team.players}>{team.teamName}</option>}  
                                
                            })}
                        </select>
                    </div>
                    
                    <input type="file" name="image"></input>
                    <input type="time" name="time"></input>
    
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
               
            
            
            </div>
        )

    }
   
}

