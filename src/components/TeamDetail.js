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
        console.log('game::::' + this.state.game)
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
        if(this.state.game.maxPlayers === this.state.game.players.length){
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
                this.props.history.push('/team-info')
    
            })
            .catch((err) => {
                console.log(err + 'Axios Error!!!!')
            })

        } else {
            alert('Game must be full to form a team!')
        }
        
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
            <div className="page-containers">
            <h3 className="second-text">Create New Team</h3>

            <form onSubmit={this.saveTeam}>
            <div className="form-group team-details">
            
                <input className="form-control second-text" type="text" placeholder="Name your team?" name="teamName" id="teamName" required/> 
               <div>
                    <div className="team-players-div">
                        <h5 className="second-text">Players:</h5> 
                        {userNames.map((name)=> {
                            return <p className="second-text">{name}</p>
                            })}
                    </div>
                    
                    <button className="card-buttons">Save Team</button>
               </div>
                
               </div>
            </form>
           
                
                
            </div>
        )

    }
    
}