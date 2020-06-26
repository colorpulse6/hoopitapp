import React from 'react';
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom'
import axios from 'axios'
import config from '../config';


export default class UserMain extends React.Component {

    state = {
        games: []
    }

    getGames = () => {
        axios.get(`${config.API_URL}/user-main`, {withCredentials: true})
          .then((res) => {
            this.setState({
              games: res.data
            })
          })
          .catch((err) => {
            if(err.response.status === 401) {
              this.props.history.push('/')
            }
          })  
      }

      componentDidMount(){
        this.getGames();
        console.log(this.state)
       console.log('Games from User Main:   ---   ' + this.state.games)
        
      }

    render() {

        //REDIRECTS USER TO SIGN IN IF NOT LOGGED IN
    if (!this.props.loggedInUser) {
        return <Redirect to='/sign-in' />
    }

    return(
        <div >
            {/* <h1>Main User Page</h1> */}
            <div className='main-header'>
                <h2 className="hello-text">Hello {this.props.loggedInUser.username}</h2>
                <Link to="/create-game"><button className="btn btn-primary create-btn">Create A Game</button></Link>
            </div>
            

            <div className="user-main-div">

                <h4 className='title-header'>Games Near You</h4>

                <div class="row ">
                
                    <div class="games-near-you">
                        
                            
                                {
                                    this.state.games.map((el, index) => {
                                        if (el.location === this.props.loggedInUser.location && el.createdBy !== this.props.loggedInUser.username  && !el.players.includes(this.props.loggedInUser._id)) {
                                            return <div className="card each-card"> 
                                                <div className="card-body" key={index} id="game">
                                        
                                            <Link to={`/game-detail/${el._id}`}><p>Date: {el.date}</p></Link>
                                            <p className="text-info">Location: {el.location}</p>
                                            <p className="text-info">Created By: {el.createdBy}</p>
                                        
                                            <p className={el.maxPlayers > el.players.length ? "text-success" : "text-danger"}>Players: {el.players.length}/{el.maxPlayers}</p>
                                            {(el.players.length + 2 === el.maxPlayers) || (el.players.length + 1 === el.maxPlayers) ?  <p className="text-danger">Almost full!</p> : <p></p>}
                                            {el.maxPlayers === el.players.length ? <p className="text-danger">FULL</p> : <p></p>}
                                
                                           
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
                            this.state.games.map((el, index) => {
                                if (el.location === this.props.loggedInUser.location && el.createdBy === this.props.loggedInUser.username) {
                                    return <div class="card each-card">
                                    <div class="card-body" key={index} id="game">
                                
                                    <Link to={`/${el._id}/admin`}><p>Date: {el.date}</p></Link>
                                    <p className="text-success" >Location: {el.location}</p>
                                    <p className="text-success">Created By: {el.createdBy}</p>
                                
                                    <p className={el.maxPlayers > el.players.length ? "text-success" : "text-danger"}>Players: {el.players.length}/{el.maxPlayers}</p>
                                    {(el.players.length + 2 === el.maxPlayers) || (el.players.length + 1 === el.maxPlayers) ?  <p className="text-danger">Almost full!</p> : <p></p>}
                                    {el.maxPlayers === el.players.length ? <p className="text-danger">FULL</p> : <p></p>}
                        
                                    <br></br>
                                </div>
                            </div>
                                }  
                            })
                        }
                    </div>
                </div>
            </div>

            <h4 className="title-header">Upcoming Games For You</h4>
            <div className="your-games">
                
                <div className="row">
                
                    <div class="games-near-you">
                        {
                            this.state.games.map((el, index) => {
                                if (el.location === this.props.loggedInUser.location && el.createdBy !== this.props.loggedInUser.username && el.players.includes(this.props.loggedInUser._id)) {
                                    return <div class="card each-card">
                                    <div class="card-body" key={index} id="game">
                                
                                    <Link to={`/game-detail/${el._id}`}><p>Date: {el.date}</p></Link>
                                    <p className="text-success" >Location: {el.location}</p>
                                    <p className="text-success">Created By: {el.createdBy}</p>
                                
                                    <p className={el.maxPlayers > el.players.length ? "text-success" : "text-danger"}>Players: {el.players.length}/{el.maxPlayers}</p>
                                    {el.maxPlayers === el.players.length ? <p className="text-danger">FULL</p> : <p></p>}
                                   
                        
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

    
}
