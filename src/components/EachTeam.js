import React from 'react'
import axios from 'axios'
import config from '../config';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import ChatPage from './ChatPage'
import ChatInput from './ChatInput'
export default class EachTeam extends React.Component {

    state = {
        team: ''
    }


    componentDidMount(){
        let id = this.props.match.params.teamId
       axios.get(`${config.API_URL}/each-team/${id}`, {withCredentials: true})
        .then((res) => {
          this.setState({
            team: res.data
          })
          console.log(this.state)

        })
        .catch((err) => {
            console.log('Error getting team:  ' + err)
        })
        console.log(id)
      }
    
      //FOR DISPLAYING CHAT
       openForm = () => {
        document.getElementById("myForm").style.display = "block";
      }
      
       closeForm = () => {
        document.getElementById("myForm").style.display = "none";
      }


    render(){

        let { owner, teamName, homeTown, gamesPlayed, players } = this.state.team
        //PUSH REF IDS TO NEW ARRAY FOR SOME REASON?!?!
        let doobs = []
        for(const player in players){
            doobs.push(players[player])
            
       }

        return(
            <div className="games-near-you main-header">
            <h1>{teamName}</h1>
               {
                <div className="card game-card ">
                   
                   <p>Owner: {owner}</p>
                   <p>Hometown: {homeTown}</p>
                   <p>Players: {
                       doobs.map((player) => {
                           return player.username
                       })
                   }</p>
                   
               </div>

               }

               <ChatPage 
                   loggedInUser = {this.props.loggedInUser}
               />

                
               

            </div>
        )
    }
}