import React from 'react';
import axios from 'axios'
import config from '../config';
import { Redirect } from 'react-router-dom';

export default class GameDetail extends React.Component {

    state = {
        game: ''
    }
    componentDidMount(){
        let id = this.props.match.params.gameId
        console.log('id is ' + this.props.match.params)
        axios.get(`${config.API_URL}/${id}`, {withCredentials: true})
            .then((res) => {
                console.log(id)
                this.setState({
                    game: res.data
                })
                console.log(this.state.game)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {

        // if (!this.props.loggedInUser) {
        //     return <Redirect to='/sign-in' />
        // }
        const {location, date, createdBy, maxPlayers, players} = this.state.game
        console.log('game is' + createdBy)
        return(
            <div>
            <h1>Game Detail Page</h1>
                <p>Location: {location}</p>
                <p>Date: {date}</p>
                <p>Created By: {createdBy}</p>
                <p>Players: {players}</p>
            </div>
        )

    }
    
}