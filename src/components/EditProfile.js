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

      uploadImage = (e) => {
        let imageUrl = e.target.file.files[0];
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
                window.location.reload(true);
            })
            .catch((err) => {
                console.log(err);
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    reload = () => {
        window.location.reload(true); 

    }
            //!!!!!!!!!!!!!!
    handleEditProfile = (e) => {
        e.preventDefault()
        let username = e.target.changeName.value
        let location = e.target.changeCity.value
        let imageUrl = e.target.file.files[0];
        let id = this.props.loggedInUser._id
        if(username && !location && !imageUrl){
            username = e.target.changeName.value
            location = this.props.loggedInUser.location
        } else if (!username && location && !imageUrl){
            username = this.props.loggedInUser.username
            location = e.target.changeCity.value
        } else if (!username && !location && imageUrl){
            username = this.props.loggedInUser.username
            location = this.props.loggedInUser.location
            this.uploadImage(e)
        } else if (!username && location && imageUrl){
            username = this.props.loggedInUser.username
            location = e.target.changeCity.value
            this.uploadImage(e)
        } else if (username && !location && imageUrl){
            username = e.target.changeName.value
            location = this.props.loggedInUser.location
            this.uploadImage(e)
        } else if (!username && !location && !imageUrl){
            username = this.props.loggedInUser.username
            location = this.props.loggedInUser.location
        } else {
            username = e.target.changeName.value
            location = e.target.changeCity.value
        }

        axios.post(`${config.API_URL}/edit-profile/${id}`, {
            username: username,
            location: location
        },{withCredentials: true})
            .then((res) => {
                console.log('Profile Edited' + res.data) 
                this.setState({
                    loggedInUser:res.data
                }, () => {
                    this.props.history.push('/edit-profile')
                  })
                
                // if((!username && !location && imageUrl) || (!username && location && imageUrl)||(username && !location && imageUrl)){
                //     window.location.reload(false); 
                // } else {
                    

                // }
                            

            })
            .catch((err) => {
                    console.log(err)
            })
            
            console.log(location, imageUrl, username)
    }

    render() {

        return(
            <div className="page-containers ">
                <div >
                    <h3 class="second-font edit-profile-header">Edit Profile</h3>
                </div>

                <img className="edit-profile-page-image" src={this.props.loggedInUser.imageUrl}></img>
                

                <form className="form-container edit-profile" onSubmit={this.handleEditProfile}>
            
                    <div class="form-group">
                        <label for="changeName"></label>
                        <input type="text" class="second-font form-control" id="changeName" aria-describedby="changeName" placeholder={this.props.loggedInUser.username} name="changeName"></input>
                        <small id="emailHelp" class="form-text text-muted"></small>
                    </div>
                    <div class="form-group">
                        <label for="changeCity"></label>
                        <input type="text" class="second-font form-control" id="changeCity" placeholder={this.props.loggedInUser.location} name="changeCity"></input>
                    </div>
                    <input type="file" id="file" name="file" accept="image/*" class="uploader"/>
                        <label className="second-font" htmlFor="file">Upload Image</label>
                    <button type="submit" class="card-buttons">Edit<img className="next-button" src={nextButton}></img></button>

                    
                   

                
            </form>

            
            </div>
        )

    }
    
}
