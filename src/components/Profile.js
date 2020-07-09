import React from 'react';
import axios from 'axios'
import config from '../config';
import {Link} from 'react-router-dom'

import nextButton from '../images/next-button.png'
import userImg from '../images/combined-shape-copy.png'
import dateImg from '../images/combined-shape.png'
import group2 from '../images/group-2.png'
export default class Profile extends React.Component {


    render() {

        return(
            
            <div className="page-containers">
            
            
                <img className="profile-page-image" src={this.props.loggedInUser.imageUrl}></img>

                <p className="profile-page-name">{this.props.loggedInUser.username}</p>
                <div className="game-detail-text">
                <hr></hr>

                    
                <div className="profile-page-text">
                
                <p className="second-font profile-labels"><img className="location-img" src={group2}></img>{this.props.loggedInUser.location}</p> 
                   

                    <p className="second-font profile-labels "><img className="circle-img" src={userImg}></img>{this.props.loggedInUser.email} </p>
                    
                    </div>
                    
                    <hr></hr>
                    </div>
                    <Link to="/edit-profile"><button className="card-buttons second-font edit-profile-btn">Edit Profile <img className="next-button" src={nextButton}></img></button></Link>
                    


                    </div>
            
        )

    }

}