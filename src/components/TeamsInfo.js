import React from 'react';
import axios from 'axios'
import config from '../config';
import { Redirect } from 'react-router-dom';


export default class TeamsInfo extends React.Component {
   
    state = {
        teams: []
    }

    componentDidMount(){
        
            
            // console.log(this.state.teams + 'These are teams!')
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
                // console.log('Team pLayers on Team Info Page: ' + this.state.teams)
    }

    handleQuitTeam = (e) => {
        // console.log(e.target.value)
        let id = e.target.value
        // console.log('Wanna QUIT?!')
        axios.post(`${config.API_URL}/quit-team/${id}`, {}, {withCredentials: true})
        .then((res) => {
            console.log('Client Side works ' + this.props.loggedInUser._id + ' from ' + id)
            this.props.history.push('/user-main')
        })
        .catch((err)=> {
            console.log('Something went wrong deleting from team on the client side' + err)
        })
            
    }



    render() {
        if (!this.props.loggedInUser) {
            return <Redirect to='/sign-in' />
        }

        let playerIds = []
        let playerNames = []
        //GET PLAYER IDS FROM TEAM OBJECT
        this.state.teams.map((team) => {
            team.players.forEach((eachId)=> {
                playerIds.push(eachId)
            })
        })
        //TEST PLAYER IDS AGAINST USER IDS AND ADD NAMES TO ARRAY
        for(let i = 0; i< this.props.users.length; i++){
            for(let j=0; j<playerIds.length; j++){
                if(this.props.users[i]._id === playerIds[j]){
                    playerNames.push(this.props.users[i].username)
                }
            }
        }
        //REMOVE DUPLICATES FROM NAMES ARRAY
        let uniqueArray = playerNames.filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        })
        // console.log(playerNames + "IOUBI/ZGUSA")

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

                    <div>Players:
                    {
                        uniqueArray.map((name)=> {
                            return <p>{name}</p>
                        })
                    }
                    </div>
                    <button value={team._id} onClick={this.handleQuitTeam}>Quit Team</button>
                    
                </div>
                
                
            })}
            
            </div>
        )

    }

}