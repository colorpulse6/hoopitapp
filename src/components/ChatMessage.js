import React from 'react'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import bball from '../images/b-ball.png'
import dummyProfile from '../images/profile-dummy.png'


export default ({ name, message, loggedInUser, imageUrl }) => 

        <div className={loggedInUser.username === name ? "chat-container" : "chat-container darker"}>

        <img src={imageUrl ? imageUrl: bball} alt="Avatar" className={loggedInUser.username === name ? "right" : ""}></img>

        <div className="p-container">
            <p className="second-font">
            <strong className={loggedInUser.username === name ? "user-chat-name" : "other-chat-name"}></strong>  <em>{message}</em>
            </p>
        </div>
    </div>
    


  