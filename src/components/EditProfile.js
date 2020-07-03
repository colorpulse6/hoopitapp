import React from 'react';
import axios from 'axios'
import config from '../config';

export default class EditProfile extends React.Component {

    state = {
        loggedInUser: ''

    }

    componentDidMount(){
        this.getUser()
        console.log(this.state)
       console.log('Games from User Main:   ---   ' + this.state.games)
        
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
    handleEditProfile = (e) => {
        e.preventDefault()
        let username = e.target.changeName.value
        let location = e.target.changeCity.value
        let id = this.props.loggedInUser._id
        if(username && !location){
            axios.post(`${config.API_URL}/edit-profile/${id}`, {
                username: username,
                location: this.props.loggedInUser.location
            },{withCredentials: true})
                .then((res) => {
                 console.log('Profile Edited' + res.data)  
                })
                .catch((err) => {
                    console.log(err)
                })

        } else if (!username && location) {
            axios.post(`${config.API_URL}/edit-profile/${id}`, {
                username: this.props.loggedInUser.username,
                location: location
            },{withCredentials: true})
                .then((res) => {
                 console.log('Profile Edited' + res.data)  
                })
                .catch((err) => {
                    console.log(err)
                })

        } else if(!username && !location){
            axios.post(`${config.API_URL}/edit-profile/${id}`, {
                username: this.props.loggedInUser.username,
                location: this.props.loggedInUser.location
            },{withCredentials: true})
                .then((res) => {
                 console.log('Profile Edited' + res.data)  
                })
                .catch((err) => {
                    console.log(err)
                })

        
    } else {
            axios.post(`${config.API_URL}/edit-profile/${id}`, {
                username: username,
                location: location
            },{withCredentials: true})
                .then((res) => {
                 console.log('Profile Edited' + res.data)  
                })
                .catch((err) => {
                    console.log(err)
                })

        }
        
    }

    render() {

        return(
            <div className="page-containers ">
                <div className="header-texts">
                    <h3 class="second-font">Edit Profile</h3>
                </div>

            <form className="form-container edit-profile" onSubmit={this.handleEditProfile}>
            
                <div class="form-group">
                    <label for="changeName"></label>
                    <input type="text" class="second-font form-control" id="changeName" aria-describedby="changeName" placeholder="Change Name" name="changeName"></input>
                    <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label for="changeCity"></label>
                    <input type="text" class="second-font form-control" id="changeCity" placeholder="Change City" name="changeCity"></input>
                </div>
                <button type="submit" class="card-buttons">Edit</button>
            </form>
            
            
            </div>
        )

    }
    
}
