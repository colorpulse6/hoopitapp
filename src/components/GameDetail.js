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
        console.log('Users on Game Deatail Page: ' + this.props.users)
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

    handleJoinGame = () => {
        this.sendNewPlayers()  
        // console.log(this.state.player)
        let {location, date, createdBy} = this.state.game
        const list = this.state.game.players.concat(this.state.player);
        if(!this.state.game.players.includes(this.state.player)){
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
        } 
    }

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


    render() {

        if (!this.props.loggedInUser) {
            return <Redirect to='/sign-in' />
        }
        const {location, date, createdBy, players} = this.state.game
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
            <div className="game-detail-page">
            <div className="game-card card">
                <h1>Game Detail Page</h1>
                    <p>Location: {location}</p>
                    <p>Date: {date}</p>
                    <p>Created By: {createdBy}</p>
                    <p>Players: {userNames.map((name)=> {
                        return name
                    })}</p>
                    <div>
                    {!userNames.includes(this.props.loggedInUser.username) ? <button onClick={this.handleJoinGame} type="submit">Join</button> : <p>You are scheduled to play this game.</p>}
                    </div>

            </div>
            
                
            </div>
        )

    }  
    
}