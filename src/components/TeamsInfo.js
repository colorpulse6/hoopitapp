import React from 'react';
import axios from 'axios'
import config from '../config';
import { Redirect } from 'react-router-dom';


export default class TeamsInfo extends React.Component {
   
    state = {
        teams: []
    }

    componentDidMount(){
        
            
            //console.log('id is ' + this.props.match.params)
            axios.get(`${config.API_URL}/teams`, {withCredentials: true})
                .then((res) => {
                    // console.log('Info' + res.data)
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
            return <Redirect to='/sign-in' />
        }

        return(
            <div>
            <h1>Teams Info Page</h1>
            {this.state.teams.map((team, index)=> {
                if(team.players.includes(this.props.loggedInUser._id))
                return <div key={index}>
                    <p>Team Name: {team.teamName}</p>
                    <p>Owner: {team.owner}</p>
                    <p>Home Town: {team.homeTown}</p>
                    <div>Games Played: {!team.gamesPlayed ? <p>0</p>  : <p>{team.gamesPlayed}</p>}
                    </div>
                    <p>Players:
                    {team.players.map((player, index) => {
                        return <div key={index}> {player}
                        </div>
                    })}</p>
                    
                </div>
                
                
            })}
            
            </div>
        )

    }

}