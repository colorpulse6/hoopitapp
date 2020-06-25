import React from 'react';
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom'


export default function UserMain(props) {

    //REDIRECTS USER TO SIGN IN IF NOT LOGGED IN
    if (!props.loggedInUser) {
        return <Redirect to='/sign-in' />
    }

    

    return(
        <div>
            <h1>Main User Page</h1>
            <h2>Hello {props.loggedInUser.username}</h2>

            <h4>Games Near You</h4>
            {
                props.games.map((el, index) => {
                    if (el.location === props.loggedInUser.location && el.createdBy !== props.loggedInUser.username) {
                        return <div key={index} id="game">
                    
                        <Link to={`/game-detail/${el._id}`}><p>Date: {el.date}</p></Link>
                        <p>Location: {el.location}</p>
                        <p>Created By: {el.createdBy}</p>
                       
                        <p>Players: {el.players.length}/{el.maxPlayers}</p>
                        {(el.players.length + 2 === el.maxPlayers) ?  <p>Almost full!</p> : <p></p>}
            
                        <br></br>
                    </div>
                    }  
                })
            }
            <h4>Your Games</h4>
            {
                props.games.map((el, index) => {
                    if (el.location === props.loggedInUser.location && el.createdBy === props.loggedInUser.username) {
                        return <div key={index} id="game">
                    
                        <Link to={`/${el._id}/admin`}><p>Date: {el.date}</p></Link>
                        <p>Location: {el.location}</p>
                        <p>Created By: {el.createdBy}</p>
                       
                        <p>Players: {el.players.length}/{el.maxPlayers}</p>
                        {(el.players.length + 2 === el.maxPlayers) ?  <p>Almost full!</p> : <p></p>}
            
                        <br></br>
                    </div>
                    }  
                })
            }

            <Link to="/create-game"><button>Create A Game</button></Link>
        
        
        
        
        
        
        </div>
    )
}