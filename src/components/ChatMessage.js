import React from 'react'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import bball from './b-ball.png'

export default ({ name, message, loggedInUser }) =>

    <div className={loggedInUser.username.split(' ').slice(0, -1).join(' ') === name ? "chat-container" : "chat-container darker"}>
        <img src={bball} alt="Avatar" className={loggedInUser.username.split(' ').slice(0, -1).join(' ') === name ? "right" : ""}></img>
        <p className="second-font">
        <strong className={loggedInUser.username.split(' ').slice(0, -1).join(' ') === name ? "user-chat-name" : ""}>{loggedInUser.username}</strong>:  <em>{message}</em>
        </p>

    </div>
    


  