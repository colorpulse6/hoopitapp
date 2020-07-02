import React from 'react';
import axios from 'axios'
import config from '../config';
import { Redirect } from 'react-router-dom';
import EachTeam from './EachTeam'
import {Switch, Route} from 'react-router-dom'
import {Link} from 'react-router-dom'


export default class TeamsInfo extends React.Component {
   
    state = {
        teams: []
    }

    componentDidMount(){
        
            
            console.log(this.state.teams + 'These are teams!')
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

    handleQuitTeam = (val1, val2,e) => {
        let name = val1
        let id = val2
        let confirmQuit = window.confirm(`Are you sure you want to quit the team ${name}?`);
        if (confirmQuit) {
                axios.post(`${config.API_URL}/quit-team/${id}`, {}, {withCredentials: true})
            .then((res) => {
                this.props.history.push('/user-main')
                // console.log('Client Side works ' + this.props.loggedInUser._id + ' from ' + id)
                this.setState({
                    teams: res.data,
                })
                
            })
            .catch((err)=> {
                console.log('Something went wrong deleting from team on the client side' + err)
            })
        }     
    }

    handleDisbandTeam = (e) => {
        let id = e.target.value
        console.log(id)

        let confirmQuit = window.confirm('Are you sure you want to diband this team?');
        if (confirmQuit) {
                axios.delete(`${config.API_URL}/disband-team/${id}`, {withCredentials: true})
            .then((res) => {
                this.props.history.push('/user-main')
                console.log('Client Side works to delete team ')
                this.setState({
                    teams: res.data,
                })
                
            })
            .catch((err)=> {
                console.log('Something went wrong deleting team on the client side' + err)
            })
        }     

    }



    render() {
        if (!this.props.loggedInUser) {
            return <Redirect to='/sign-in' />
        }

        let playerIds = []
        let playerNames = []
        // GET PLAYER IDS FROM TEAM OBJECT
        if(this.state.teams.length){
            this.state.teams.map((team) => {
                team.players.forEach((eachId)=> {

                    playerIds.push(eachId)
                    console.log(eachId)
                })
            })

        }
         
        //TEST PLAYER IDS AGAINST USER IDS AND ADD NAMES TO ARRAY
        for(let i = 0; i< this.props.users.length; i++){
            for(let j=0; j<playerIds.length; j++){
                if(this.props.users[i]._id === playerIds[j]){
                    playerNames.push(this.props.users[i].username)
                    
                }
            }
        }
        console.log(playerNames)
        //REMOVE DUPLICATES FROM NAMES ARRAY
        let uniqueArray = playerNames.filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        })
        // console.log(playerNames + "IOUBI/ZGUSA")

        return(
            <div className="page-containers row">
            <h3 className="second-font">Team Info</h3>
                <div className="games-near-you">
                    {/* {uniqueArray.slice(0,1).map((team, index)=> {
            return !team.includes(this.props.loggedInUser.username) ? <h3>Nobody Likes You...</h3> : <p></p>}
            )} */}
                        
                        {this.state.teams.map((team, index)=> {
                            if(team.players.includes(this.props.loggedInUser._id))
                            return <div key={index} className=" each-card team-info-card">
                                <Link to={`/each-team/${team._id}`}><p className="second-font"><strong>Team Name:</strong> {team.teamName}</p></Link>
                                <p className="second-font"><strong>Owner:</strong> {this.props.loggedInUser.username !== team.owner ? team.owner : 'You'}</p>
                                <p className="second-font"><strong>Home Town:</strong> {team.homeTown}</p>

                            <p className="second-font"><strong>Games Played:</strong> {!team.gamesPlayed ? 0  : team.gamesPlayed}
                            </p>

                        <div>
                            <p className="second-font"><strong>Players:</strong></p>
                            {
                                uniqueArray.map((name)=> {
                                    return <p className="second-font">{name}</p>
                                })
                            }
                        </div>
                        {
                            //CHANGE BUTTON DEPENDING ON OWNER OF TEAM OR NOT
                            this.props.loggedInUser.username === team.owner ? <button className="card-buttons" value={team._id} onClick={this.handleDisbandTeam}>Disband Team</button> 
                            : <button className="card-buttons" value={team.teamName, team._id} onClick={this.handleQuitTeam.bind(this, team.teamName, team._id )}>Quit Team</button>
                        }
                        
                        
                    </div>
                    
                    
                })}

                </div>
                
            </div>
        )

    }

}