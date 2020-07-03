import React from 'react';
import axios from 'axios'
import config from '../config';
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom'


export default class GameDetail extends React.Component {

    state = {
        player: '',
        game: '',
    }

    
    componentDidMount(){

        let id = this.props.match.params.gameId
        // console.log('Users on Game Deatail Page: ' + this.props.users)
        axios.get(`${config.API_URL}/game-detail/${id}`, {withCredentials: true})
            .then((res) => {
                // console.log('Info' + res.data)
                this.setState({
                    game: res.data,
                    player: this.props.loggedInUser.username
                    
                })
                console.log(res.data + 'SBDI/&&/&&/&&&&&66666')
                // console.log(this.state.game)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    // ADD PLAYER TO GAME
    handleJoinGame = () => {
          
        // console.log(this.state.player)
        let {location, date, createdBy} = this.state.game
        const list = this.state.game.players.concat(this.state.player);
        if(!this.state.game.players.includes(this.state.player)){
            if(this.state.game.players.length !== this.state.game.maxPlayers){
                this.sendNewPlayers()
                this.setState( {
                    game: {
                        location: location,
                        date: date,
                        createdBy: createdBy,
                        players: list
                    }
                }, () => {
                    this.props.history.push('/user-main')
                  })

            } else {
                
                    alert('Game is full.')
                
            }
                 
        } 
    }

    //SEND PLAYERS TO DB
    sendNewPlayers = () => {
        let id = this.props.match.params.gameId
        axios.get(`${config.API_URL}/join-game/${id}`, {withCredentials: true})
        .then((res) => {
            // console.log(res)         
        })
        .catch((err) => {
            console.log(err + 'ERRRRRRR')
        })
    }


    handleQuitGame = (e) => {
        
        let id = e.target.value
        
        console.log('gameId:' + id)
        console.log('user ' + this.props.loggedInUser._id)
        let confirmQuit = window.confirm(`Are really a quitter?`);
        if (confirmQuit) {
                axios.get(`${config.API_URL}/quit-game/${id}`, {withCredentials: true})
            .then((res) => {
                console.log(res.data + "success")
                this.props.history.push('/user-main')
            })
            .catch((err)=> {
                console.log('Game delete error client side' + err)
            })
   
        }
        
            
    }


    render() {

        if (!this.props.loggedInUser) {
            return <Redirect to='/sign-in' />
        }
        const {location, date, createdBy, players, _id, savedAsTeam} = this.state.game
        console.log('players:  ' + typeof players) 
            let userNames = []
            for (let i = 0; i< this.props.users.length; i++){
                for (const prop in players){
                    console.log(players[prop])
                  if(this.props.users[i]._id === players[prop]){

                   userNames.push(this.props.users[i].username)
                  }
                }
            }
            
            console.log(userNames)
            
        
        return(
            
            <div className="page-containers">
                <div className="game-detail-page">
                    <div className="game-detail-text">

                    
                    <h4 className="second-font">Game Details</h4>
                        <p className="second-font"><strong>Location: </strong><br></br> {location}</p>
                        <p className="second-font"><strong>Date: </strong><br></br> {date}</p>
                        <p className="second-font"><strong>Created By: </strong><br></br> {createdBy}</p>
                        {
                            savedAsTeam  ? <p className="second-font"><strong>Team:</strong> <br></br>{savedAsTeam}</p> : <div><p className="second-font"><strong>Players:</strong> <br></br> {userNames.map((name)=> {
                            return <div>{name}
                            <br></br></div> 
                             })}</p></div>
                    }
                    
                         </div>
                        <div>
                        {
                            !userNames.includes(this.props.loggedInUser.username) ? <button className="btn btn-primary" onClick={this.handleJoinGame} type="submit">Join</button> : <div>
                            <p>You are scheduled to play this game.</p> 
                            <button className="red-buttons" value={_id} onClick={this.handleQuitGame}>Leave Game</button>
                            </div>
                        }
                        
                        </div>

                </div>
            
                
            </div>
        )

    }  
    
}