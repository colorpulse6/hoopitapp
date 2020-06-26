import React from 'react';
import { Redirect } from 'react-router-dom';


export default function CreateGame(props) {

    if (!props.loggedInUser) {
        //REDIRECTS USER TO SIGN IN IF NOT LOGGED IN
        return <Redirect to='/sign-in' />
    }

    return(
        <div>
        <h1>Create Game Page</h1>
        
        <form onSubmit={props.onAddGame}>
                
                <div className="form-group">
                    <label htmlFor="Date">Date</label>
                    <input type="date" className="form-control" name="date" id="date" />
                </div>

                <div className="form-group">
                    <label htmlFor="location">location</label>
                    <input type="text" className="form-control" name="location" id="location" />
                </div>
                <div className="form-group">
                    <label htmlFor="maxPlayers">Max Players</label>
                    <input type="text" className="form-control" name="maxPlayers" id="maxPlayers" />
                </div>

                <input type="file" name="image"></input>
                
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        
        
        
        </div>
    )
}