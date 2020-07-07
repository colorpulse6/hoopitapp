import React from 'react';
import axios from 'axios'
import config from '../config';
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom'
import TeamDetail from './TeamDetail'
import nextButton from '../images/next-button.png'
import userImg from '../images/combined-shape-copy.png'
import dateImg from '../images/combined-shape.png'
import group2 from '../images/group-2.png'


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
        let confirmQuit = window.confirm('Are you sure you want to cancel this game?');
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
        const {location, time, date, createdBy, players, _id, savedAsTeam} = this.state.game
        console.log('team:  ' + savedAsTeam) 
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
                <h4 className="second-font">{this.props.loggedInUser.username}'s game</h4>
                <div className="game-detail-text">
                {/* <img class="" src="https://source.unsplash.com/400x250/?basketball,court"  alt="..."></img> */}

                    <p className="second-font labels"><img src={dateImg}></img>Date and Time</p> <hr></hr>
                    <div className="dateTime"><p className="inputs"> {date}</p><p className="inputs"> Game Time: {time}</p></div>

                    <p className="second-font labels"><img src={group2}></img>Location </p>
                    <hr></hr>
                    <p className="inputs">{location}</p>

                    
                    {
                        savedAsTeam  ? <p className="second-font labels">Team: <br></br>{savedAsTeam}</p> : <div><p className="second-font labels">Players</p>
                        <hr></hr> 
                        <p className="inputs">{userNames.map((name)=> {
                        return <div>{name}
                        <br></br></div> 
                    })}</p>
                    <input type="checkbox" id="saveAsTeam" name="saveAsTeam" value="team"></input>
                    <label className="inputs" for="saveAsTeam">Save as team</label>
                        </div>
                    }
                    


                
                    
                </div>
                <div className=" admin-buttons">
                {savedAsTeam === undefined? <div><Link to={`/${_id}/admin/team-detail`}><button className="card-buttons" onClick={this.makeTeam} type="submit">Save Group as Team<img className="next-button" src={nextButton}></img></button></Link>
                    <br></br>
                <Link to={`/${_id}/admin/cancel-game`}><button className="card-buttons red-buttons" onClick={this.cancelGame} type="submit">Cancel Game<img className="next-button" src={nextButton}></img></button></Link></div> :
                <Link to={`/${_id}/admin/cancel-game`}><button className="card-buttons red-buttons" onClick={this.cancelGame} type="submit">Cancel Game<img className="next-button" src={nextButton}></img></button></Link>

                
                    
                    }
                
                    </div>

            </div>

            </div>
            
        )

    }
    
}