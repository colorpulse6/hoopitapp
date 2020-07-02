import React from 'react';
import Map from './Map'
import axios from 'axios'
import {Link} from 'react-router-dom'

import config from '../config';
import hoopitappLogo from './hoopitapp-logo.png'
import nextButton from './next-button.png'
import RadialChart from './RadialChart'

export default class Home extends React.Component {

    state={
        games: []
    }
    getGames = () => {
        axios.get(`${config.API_URL}/main`, {withCredentials: true})
          .then((res) => {
            this.setState({
              games: res.data
            })
            console.log('GOT GAMES')
          })
          .catch((err) => {
            if(err.response.status === 401) {
              this.props.history.push('/')
            }
          })  
      }
componentDidMount(){
    this.getGames()
}
        render(){

            return(

                <div >
                    <div class="jumbotron jumbotron-fluid">
                        <div>
                            <h3 class="display-6 primary-font">JOIN A BASKETBALL TEAM ANYWHERE YOU ARE</h3>
                            <p class="lead"></p>
                        </div>
                    </div>

                    <div className="home-div page-containers">
                    <div class="container home-container second-font">
                            <h5 class="display-6 second-font">Discover games <br></br>around your area</h5>
                            <p class="lead"></p>
                        </div>
                        <div class="container home-container">
                            <h7 class="display-6 second-font">Take part in one of the games played near you, get to meet your team for the match of the day </h7>
                            <p class="lead"></p>
                        </div>


                    <div>
                    {       //SHUFFLE GAMES AND GET THE FIRST 3
                            this.state.games.sort(() => 0.5 - Math.random()).slice(0,3).map((el, index) => {
                                
                                    return <div class="card each-card home-cards">
                                    <div  key={index} id="game">
                                    <img class="card-img-top" src="https://source.unsplash.com/400x250/?basketball,court"  alt="..."></img>
                                    <div className="card-content">
                                        <div className="card-text">
                                            <p>Date: {el.date}</p>
                                            <p >Location: {el.location}</p>
                                            <p>Created By: {el.createdBy}</p>
                                        </div>
                                    
                                    <div className="chart-div">
                                    <RadialChart
                                        progress={el.players.length/el.maxPlayers*100}
                                        color="#3c71d0"
                                        number={el.players.length+'/'+el.maxPlayers}
                                        text={(el.players.length + 2 === el.maxPlayers) || (el.players.length + 1 === el.maxPlayers) ?  'Almost Full' : 'Full'}
                                    />
                                    </div>
                                    </div>
                                    <br></br>
                                    
                                </div>
                                <Link to={this.props.loggedInUser?`/${el._id}/admin`:`/sign-up`}><button className=" card-buttons">View Details<img className="next-button" src={nextButton}></img></button></Link>
                            </div>
                                  
                            })
                        }



                    </div>

                    </div>
                    

            
                </div>
            )

        }
        

    
    

    
}
