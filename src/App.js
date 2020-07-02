import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js' 

import axios from 'axios'
import {Switch, Route} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import config from './config';

import EditProfile from './components/EditProfile'
import Home from './components/Home'
import Nav from './components/Nav'
import Signin from './components/Signin'
import Signup from './components/Signup'
import UserMain from './components/UserMain'
import CreateGame from './components/CreateGame'
import GameDetail from './components/GameDetail'
import GameAdmin from './components/GameAdmin'

import TeamsInfo from './components/TeamsInfo'
import TeamDetail from './components/TeamDetail'
import EachTeam from './components/EachTeam'
import Loading from './components/Loading'
import ChatPage from './components/ChatPage'
import { lastDayOfDecade } from 'date-fns';
import { object } from 'prop-types';


class App extends React.Component {


  state = {
    loggedInUser: '',
    games:[],
    users:[],
    location:'',
    city:'',
    lat: null,
    lng: null,
    error: ''
  }

  getUser(){
    axios.get(`${config.API_URL}/user`, {withCredentials: true})
    .then((res) => {
      // console.log(res + 'ResuLT')
      this.setState({
        loggedInUser: res.data
      })
    })
      
  }

  getUsers(){
    axios.get(`${config.API_URL}/users`,{withCredentials: true})
    .then((res)=> {
      this.setState({
        users:res.data
      })
    })
  }

  getGames = () => {
    axios.get(`${config.API_URL}/main`, {withCredentials: true})
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

  componentDidMount(){
    this.getGames();
    this.getUsers();
    console.log('MOUNTED' + this.state.loggedInUser)
   
    if (!this.state.loggedInUser) {
      this.getUser();
      // console.log('GOT USER')
    }
    // console.log(this.state.loggedInUser)
    

  }

  handleSignUp = (e) => {
    e.preventDefault()
    let email = e.target.email.value;
    let username = e.target.username.value
    let password = e.target.password.value
    let location = e.target.location.value
    axios.post(`${config.API_URL}/sign-up`, { //FROM CONFIG.JS
      email: email,
      username: username,
      password: password,
      location: location
      
    }, { withCredentials: true}) //CHECKS COOKIES
    .then((res) => {
        this.setState({
          loggedInUser: res.data
        }, () => {
          this.props.history.push('/user-main')
        })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  handleSignIn = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value
    
    axios.post(`${config.API_URL}/sign-in`, {
      email: email,
      password: password
    }, {withCredentials: true})
    .then((res) => {
      // console.log('RESDATA'+res.data)
      this.setState({
        loggedInUser: res.data

      }, () => {
        this.props.history.push('/user-main')
      })
    })
    .catch((error)=> {
      this.setState({
        error:error
      })
      
    })
  }

  handleLogout = () => {
    console.log(document.cookie)
    axios.post(`${config.API_URL}/logout`, {}, { withCredentials: true})
    .then((res) => {
      // console.log(res)
      this.setState({
        loggedInUser: null
      }, () => {
        this.props.history.push('/')
      })
    })
  }

  
   handleLocationInput = (obj) => {
      this.setState({
          location: obj.address,
          city: obj.value,
          lat: obj.lat,
          lng: obj.lng
      })
    // console.log(obj)
     
}


  handleAddGame = (e) => {
    e.preventDefault()

    // console.log(this.handleLocationInput())
    let date = e.target.date.value
    let location = this.state.location
    let time = e.target.time.value
    let city = this.state.city
    let lat = this.state.lat
    let lng = this.state.lng
    let maxPlayers = e.target.maxPlayers.value
    let team;
    if(e.target.team.value === 'No team selected'){
      team = this.state.loggedInUser._id
    } else{
      team = e.target.team.value.split(',')
    }
    axios.post(`${config.API_URL}/create-game`, {
      date: date,
      time: time,
      location: location,
      city: city,
      lat: lat,
      lng: lng,
      maxPlayers: maxPlayers,
      createdBy: this.state.loggedInUser.username,
      players: team
    }, {withCredentials: true})
    .then((res) => {
      console.log('GOT GAME')
      this.setState({
        games: [...this.state.games, res.data]
      }, () => {
        this.props.history.push('/user-main')
      })
    })
    .catch((err) => {
      if(err.response.status === 401) {
        console.log(err.response.status)
      }
    })
}



  render() {
    if(!this.state.games.length){
      return (
        <div>
          <Loading />
        </div>
        )
    }
    const {loggedInUser} = this.state
    return (
      <div >
      <Nav 
      loggedInUser={this.state.loggedInUser}
      onLogout={this.handleLogout}
       />
        <Switch>
          <Route exact path="/"  render={() => {
                return <Home 
                games={this.state.games}
                loggedInUser={this.state.loggedInUser}
                users={this.state.users}
                getGames={this.getGames}
                // getUser={this.getUser}
                // getGames={this.getGames}
                />
              }}/>
          <Route path="/sign-in"  render={() => {
              return <Signin 
              onSignIn={this.handleSignIn}
              error={this.state.error} 

              />
            }}/>    
          <Route path="/sign-up"  render={() => {
              return <Signup onSignUp = {this.handleSignUp} 
              error={this.state.error}
              />
            }}/>  
            <Route path="/edit-profile"  render={() => {
              return <EditProfile 
              loggedInUser={loggedInUser}
              games={this.state.games}
              users={this.state.users}
              />
            }}/>
          <Route path="/user-main"  render={() => {
              return <UserMain 
              loggedInUser={loggedInUser}
              games={this.state.games}
              users={this.state.users}
              />
            }}/>  
          <Route path="/team-info"  render={(routeProps) => {
              return <TeamsInfo 
              loggedInUser={loggedInUser} 
              {...routeProps}
              users={this.state.users}
              games={this.state.games}

              />
            }}/> 
          <Route path="/create-game"  render={() => {
              return <CreateGame 
              loggedInUser={loggedInUser} 
              onAddGame={this.handleAddGame} 
              useTeam={this.handleUseTeam} 
              handleLocationInput={this.handleLocationInput}
              />
            }}/>  
           <Route exact path="/game-detail/:gameId"  render={(routeProps) => {
              return <GameDetail 
              loggedInUser={loggedInUser} 
              {...routeProps}
              users={this.state.users}
               
              />
            }}/>   
           <Route exact path="/:gameId/admin"  render={(routeProps) => {
              return <GameAdmin 
              loggedInUser={loggedInUser} 
              {...routeProps}
              users={this.state.users}
               
              />
            }}/>    
            <Route path="/:gameId/admin/team-detail"  render={(routeProps) => {
              return <TeamDetail 
              loggedInUser={loggedInUser} 
              {...routeProps}
              users={this.state.users}
               
              />
            }}/>
            
            <Route path="/each-team/:teamId"  render={(routeProps) => {
              return <EachTeam 
              loggedInUser={loggedInUser} 
              {...routeProps}
              users={this.state.users}
               
              />
            }}/>
            

        </Switch>
      </div>
    );

  }
  
}

export default withRouter(App)
