import React from 'react';
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom'


export default function UserMain(props) {

    //REDIRECTS USER TO SIGN IN IF NOT LOGGED IN
    if (!props.loggedInUser) {
        return <Redirect to='/sign-in' />
    }

    

    return(
        <div >
            {/* <h1>Main User Page</h1> */}
            <div className='main-header'>
                <h2 className="hello-text">Hello {props.loggedInUser.username}</h2>
                <Link to="/create-game"><button className="btn btn-primary create-btn">Create A Game</button></Link>
            </div>
            

            <div className="user-main-div">

                <h4 className='title-header'>Games Near You</h4>

                <div class="row ">
                
                    <div class="games-near-you">
                        
                            
                                {
                                    props.games.map((el, index) => {
                                        if (el.location === props.loggedInUser.location && el.createdBy !== props.loggedInUser.username) {
                                            return <div className="card each-card"> 
                                                <div className="card-body" key={index} id="game">
                                        
                                            <Link to={`/game-detail/${el._id}`}><p>Date: {el.date}</p></Link>
                                            <p className="text-info">Location: {el.location}</p>
                                            <p className="text-info">Created By: {el.createdBy}</p>
                                        
                                            <p className="text-info">Players: {el.players.length}/{el.maxPlayers}</p>
                                            {(el.players.length + 2 === el.maxPlayers) ?  <p className="text-danger">Almost full!</p> : <p></p>}
                                
                                           
                                        </div>
                                    </div>
                                        }  
                                    })
                                }
                    </div>
                </div>
            </div>
            <h4 className="title-header">Your Games</h4>
            <div className="your-games">
                
                <div className="row">
                
                    <div class="games-near-you">
                        {
                            props.games.map((el, index) => {
                                if (el.location === props.loggedInUser.location && el.createdBy === props.loggedInUser.username) {
                                    return <div class="card each-card">
                                    <div class="card-body" key={index} id="game">
                                
                                    <Link to={`/${el._id}/admin`}><p>Date: {el.date}</p></Link>
                                    <p className="text-success" >Location: {el.location}</p>
                                    <p className="text-success">Created By: {el.createdBy}</p>
                                
                                    <p className="text-success">Players: {el.players.length}/{el.maxPlayers}</p>
                                    {(el.players.length + 2 === el.maxPlayers) ?  <p className="text-danger">Almost full!</p> : <p></p>}
                        
                                    <br></br>
                                </div>
                            </div>
                                }  
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
