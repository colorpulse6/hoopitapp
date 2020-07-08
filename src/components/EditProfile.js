import React from 'react';
import axios from 'axios'
import config from '../config';
import nextButton from '../images/next-button.png'

export default class EditProfile extends React.Component {

    state = {
        loggedInUser: '',
        
    }

    componentDidMount(){
        this.getUser()
        
      }

      getUser(){
        axios.get(`${config.API_URL}/user`, {withCredentials: true})
        .then((res) => {
          // console.log(res + 'ResuLT')
          this.setState({
            loggedInUser: res.data,
            profilePic: res.data.imageUrl
          })
          console.log(res.data)
        })
      }


      handleProfilePic = (e) => {
        e.preventDefault();
        let imageUrl = e.target.file.files[0];
        let id = this.props.loggedInUser._id
        console.log(imageUrl);
    
        let uploadData = new FormData();
        uploadData.append("imageUrl", imageUrl);
    
        axios.post(`${config.API_URL}/upload-img`, uploadData)
          .then((res) => {
            let profileImg = res.data.secure_url;
            console.log(profileImg);
            axios
              .patch(
                `${config.API_URL}/edit-profile-pic`,
                { profileImg },
                { withCredentials: true }
              )
              .then(() => {
                this.setState({
                  profileImg: res.data.secure_url,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
          
      };

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
                <button type="submit" class="card-buttons">Edit<img className="next-button" src={nextButton}></img></button>

                
            </form>

            <form
                    onSubmit={this.handleProfilePic}
                >
                    <input type="file" id="file" name="file" accept="image/*" />
                    <label htmlFor="file">Upload Profile Picture...</label>
                    <button type="submit">Save</button>
                </form>

           
               
            
            
            </div>
        )

    }
    
}
