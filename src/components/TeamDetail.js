import React from 'react';
import axios from 'axios'
import config from '../config';

export default class TeamsDetail extends React.Component {

    state = {
        game: '',
        team: ''
        
    }
//QUESTION: DO I NEED TO CALL getUser() EVERY PAGE?
    componentDidMount(){
        let id = this.props.match.params.gameId
        axios.get(`${config.API_URL}/game-detail/${id}`, {withCredentials: true})
            .then((res) => {
            // console.log('GAME DETAIL' + res.data)                

                this.setState({
                    game: res.data,
                })
                // console.log(this.state.game)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    saveTeam = (e) => {
        e.preventDefault()
      
        let id = this.props.match.params.gameId
        let owner = this.props.loggedInUser.username
        // console.log(owner)
        let teamName = e.target.teamName.value
        let homeTown = this.props.loggedInUser.location
        const list = this.state.game.players;
        axios.post(`${config.API_URL}/${id}/save-team`, {
            owner: owner,
            teamName: teamName,
            hoometown: homeTown,
            players: list
            
            
        }, {withCredentials: true})
        .then((res) => {
            this.setState({
                team: {
                    teamName: teamName,
                    players: list
                } 
            })
        })
        .catch((err) => {
            console.log(err + 'Axios Error!!!!')
        })
    }

    render() {

        const {players} = this.state.game
         //FIND NAMES BY ID
            let userNames = []
            for (let i = 0; i< this.props.users.length; i++){
                for (const prop in players){
                  if(this.props.users[i]._id === players[prop]){
                     userNames.push(this.props.users[i].username)
                  }
                }
            }
            
            
        
        return(
            <div>
            <h1>Team Detail Page</h1>

            <form onSubmit={this.saveTeam}>
                <input type="text" placeholder="Name your team?" name="teamName" id="teamName"/>
                <br></br>
                <br></br>
                <p>Players: {userNames.map((name)=> {
                    return name
                })}</p>
                <button>Save Team</button>
                    
            </form>
           
                
                
            </div>
        )

    }
    
}