import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import config from '../config';
import Map from "./Map"
import nextButton from '../images/next-button.png'
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
            <div className="page-containers">
            <div className="create-header-texts">
                <h3 class="display-6 second-font">Create your Game</h3>
                <p className="second-font">Fill in details to create a match</p>
            </div>
            
            
            <div className="create-game-main">
            
            
            <form onSubmit={this.props.onAddGame}>
                    
                    <div className="form-group">
                        <label htmlFor="Date" className="second-font"><strong>Choose your date and time</strong></label>
                        <hr></hr>
                        <div className="date-time">
                        <input type="date" className="form-control" name="date" id="date" required/>
                        <input type="time" className="form-control" name="time"></input>
                        </div>
                    </div>
    
                    <div className="form-group">
                        <label htmlFor="location" className="second-font"><strong>Location</strong></label>
                        <hr></hr>
                        {/* <input type="text" className="form-control" name="location" id="location" required/> */}
                        <div>
                            <SearchCity 
                            panTo={this.props.handleLocationInput
                            }
                            
                         
                        />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="maxPlayers" className="second-font"><strong>Pick number of players</strong></label>
                        <hr></hr>
                        <input type="text" className="form-control" name="maxPlayers" id="maxPlayers" required/>
                    </div>
                    <div className="form-group">
                    <div className="team-select">
                        <label for="team" className="second-font"><strong>Use a Team?</strong></label>
                        <hr></hr>
                            <select name="team" id="team" className="form-control">
                                <option>No team selected</option>
                                {this.state.teams.map((team, index)=>{
                                    if(this.props.loggedInUser.username === team.owner) { return <option key={index} value={team.players}>{team.teamName}</option>}  
                                    
                                })}
                            </select>
                    </div>
                    
                    </div>
                    
                    {/* <input type="file" name="image"></input> */}
                    
    
                    <button type="submit" className="card-buttons">Create <img className="next-button" src={nextButton}></img></button>
                </form>
               
            
            
            </div>

            </div>
            
        )

    }
   
}

