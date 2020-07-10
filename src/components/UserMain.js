import React from 'react';
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom'
import axios from 'axios'
import config from '../config';
import Map from './Map'
import RadialChart from './RadialChart'
import nextButton from '../images/next-button.png'
import userImg from '../images/combined-shape-copy.png'
import dateImg from '../images/combined-shape.png'
import group2 from '../images/group-2.png'




export default class UserMain extends React.Component {

    state = {
        games: [],

    }

    componentDidMount(){
        this.getGames();

      }

    getGames = () => {
        axios.get(`${config.API_URL}/user-main`, {withCredentials: true})
          .then((res) => {
            this.setState({
              games: res.data
            })
          })
          .catch((err) => {
            if(err.response.status === 401) {
              this.props.history.push('/')
            }
          })  
      }

     

    render() {

    if (!this.props.loggedInUser) {
        return <Redirect to='/sign-in' />
    }
    

    return(
        <div >

            {/* JUMBOTRON*/}
            <div class="jumbotron jumbotron-fluid">
                        <div class="container">
                            <h4 class="display-6 second-font welcome-text">Welcome {this.props.loggedInUser.username}!</h4>
                            <p class="lead"></p>
                        </div>
                    </div>


            <div className="page-containers">
          
           

            <h3 className='user-main-header second-font near-you-text'>Discover games around your area</h3>
            {/* <p className="second-font take-part-text">Take part in one of the games played near you, get to meet your team for the match of the day</p> */}

                
                
                    <div >

                    {/* MAP */}
                    <div className="map-div"><Map 
                        loggedInUser={this.props.loggedInUser}
                        />
                    </div>
                    
                        
                            {/* SHOW GAMES IN YOUR CITY */}
                                {/* {
                                    this.state.games.map((el, index) => {
                                        if (el.city === this.props.loggedInUser.location && el.createdBy !== this.props.loggedInUser.username  && !el.players.includes(this.props.loggedInUser._id)) {
                                            return <div className="card each-card"> 
                                                <div className="card-body" key={index} id="game">
                                        
                                            <p>Date: {el.date}</p>
                                            <p className="text-info">Location: {el.location}</p>
                                            <p className="text-info">Created By: {el.createdBy}</p>
                                        
                                            <p className={el.maxPlayers > el.players.length ? "text-success" : "text-danger"}>Players: {el.players.length}/{el.maxPlayers}</p>
                                            {(el.players.length + 2 === el.maxPlayers) || (el.players.length + 1 === el.maxPlayers) ?  <p className="text-danger">Almost full!</p> : <p></p>}
                                            {el.maxPlayers === el.players.length ? <p className="text-danger">FULL</p> : <p></p>}
                                
                                            <Link to={`/game-detail/${el._id}`}><button className="btn btn-primary">View Details</button buttons></Link>
                                        </div>
                                    </div>
                                        }  
                                    })
                                } */}
                    </div>
                
            
            
                    <div class="user-main-cards-div">
                <div className="row">
                    <div>
                    
                                
                        {/* SHOW GAMES YOU MADE */}
                        {this.state.games.length === 0 ?  <p className="second-font">You don't have any games, create one below!</p> : null}

                        {
                            this.state.games.slice(0,1).map((el, index) => {
                                if (el.createdBy === this.props.loggedInUser.username) {
                                    return <div key={index}><h3 className="main-page-headers second-font">Your Games</h3></div>}})

                        }
                        <div className="game-cards">
                        {
                            this.state.games.map((el, index) => {
                                if (el.createdBy === this.props.loggedInUser.username) {
                                    return <div class="card each-card">
                                    <div  key={index} id="game">
                                    <img class="card-img-top" src={el.imageUrl}  alt="..."></img>
                                    <div className="card-content">
                                        <div className="card-text">
                                        <p className="second-font created-by-name"><img src={userImg}></img>{el.createdBy}</p>
                                            <p className="second-font"><img src={dateImg}></img>{el.date}</p>
                                            <p className="second-font location-text" ><img src={group2}></img>{el.location}</p>
                                            
                                        
                                            {/* <p className={el.maxPlayers > el.players.length ? "text-success" : "text-danger"}>Players: {el.players.length}/{el.maxPlayers}</p>
                                            {(el.players.length + 2 === el.maxPlayers) || (el.players.length + 1 === el.maxPlayers) ?  <p className="text-danger">Almost full!</p> : <p></p>}
                                            {el.maxPlayers === el.players.length ? <p className="text-danger">FULL</p> : <p></p>} */}
                                        </div>
                                    
                                    
                                    <div className="chart-div">
                                    <RadialChart
                                        progress={el.players.length/el.maxPlayers*100}
                                        color="#C9082A"
                                        number={el.players.length+'/'+el.maxPlayers}
                                        text={(el.players.length + 2 === el.maxPlayers) || (el.players.length + 1 === el.maxPlayers) ?  'Almost Full' : 'Full'}
                                    />
                                    </div>
                                    </div>
                                    <br></br>
                                    
                                </div>
                                <Link to={`/${el._id}/admin`}><button className="  card-buttons">View Details <img className="next-button" src={nextButton}></img></button></Link>
                            </div>
                                    
                                    
                                }  
                            })
                        }
                        </div>
                    </div>
                
                    </div>
            
            
                
                <div className="row">
                
                    <div class="">

                    {/* SHOW GAMES YOU JOINED */}
                    
                    {
                        this.state.games.slice(0,1).map((el, index) => {
                                if ( el.players.includes(this.props.loggedInUser._id) && el.createdBy !== this.props.loggedInUser.username) {
                                    return <h3 className="main-page-headers second-font">Your upcoming games</h3>}})
                    }
                    <div className="game-cards ">
                    
                        {
                            
                            
                            this.state.games.map((el, index) => {
                                if ( el.players.includes(this.props.loggedInUser._id) && el.createdBy !== this.props.loggedInUser.username) {
                                    return <div>
                                    <div class="card each-card">
                                    <div key={index} id="game">
                                    <img class="card-img-top" src={el.imageUrl}  alt="..."></img>
                                    <div className="card-content">
                                    <div className="card-text">
                                    <p className="second-font created-by-name"><img src={userImg}></img> <strong>{el.createdBy}</strong></p>
                                    <p className="second-font"><img src={dateImg}></img> {el.date}</p>
                                    <p className="second-font location-text" ><img src={group2}></img>  {el.location}</p>
                                    
                                    </div>
                                    <div className="chart-div">
                                    <RadialChart
                                        progress={el.players.length/el.maxPlayers*100}
                                        color="#C9082A"
                                        number={el.players.length+'/'+el.maxPlayers}
                                        text={(el.players.length + 2 === el.maxPlayers) || (el.players.length + 1 === el.maxPlayers) ?  'Almost Full' : 'Full'}
                                    />
                                    </div>
                                    </div>
                                    
                                   
                        
                                    <br></br>
                                    
                                </div>
                                <Link to={`/game-detail/${el._id}`}><button className=" card-buttons">View Details <img className="next-button" src={nextButton}></img></button></Link>
                            </div>
                                    </div>
                                }  
                            })
                        
                        }
                        </div>
                    </div>
                
                
        </div>
                        </div>
        

            
        <div class="create-game-butn-div">
    <div class="">
    <Link to="/create-game"><button className="card-buttons second-font ">Create A Game <img className="next-button" src={nextButton}></img></button></Link>    </div>
  </div>

        
</div>


        </div>
        
    )

    }

    
}
