import React from 'react';
import axios from 'axios'
import config from '../config';
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom'
import TeamDetail from './TeamDetail'



export default class GameAdmin extends React.Component {

    state = {
        player: '',
        game: '',
    }

    
    
    componentDidMount(){
        let id = this.props.match.params.gameId
        // console.log('id is ' + this.props.match.params)
        axios.get(`${config.API_URL}/game-detail/${id}`, {withCredentials: true})
            .then((res) => {
                // console.log('Info' + res.data)
                this.setState({
                    game: res.data,
                    player: this.props.loggedInUser.username
                })
                // console.log(this.state.game)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    cancelGame = () => {
        let id = this.props.match.params.gameId
        let confirmQuit = window.confirm('Are you sure you want to cancel this team?');
        if (confirmQuit) {
                axios.delete(`${config.API_URL}/${id}/admin/cancel-game`, {withCredentials: true})
            .then((res) => {
                this.props.history.push('/user-main')
                console.log('Client Side works to delete game ')
                this.setState({
                    teams: res.data,
                })
                
            })
            .catch((err)=> {
                console.log('Something went wrong deleting game team on the client side' + err)
            })
        }     
    }


    render() {

        if (!this.props.loggedInUser) {
            return <Redirect to='/sign-in' />
        }
        const {location, date, createdBy, players, _id} = this.state.game
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
                    <h1>Game Detail Page Admin</h1>
                    <p>Location: {location}</p>
                    <p>Date: {date}</p>
                    <p>Created By: {createdBy}</p>
                    <p>Players: {userNames.map((name)=> {
                        return name
                    })}</p>

                </div>
                    
                <Link to={`/${_id}/admin/team-detail`}><button className="btn btn-primary" onClick={this.makeTeam} type="submit">Save Group as Team</button></Link>
                    <br></br>
                <Link to={`/${_id}/admin/cancel-game`}><button className="btn btn-primary" onClick={this.cancelGame} type="submit">Cancel Game</button></Link>

            </div>
        )

    }
    
}