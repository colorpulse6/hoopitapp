import React, { Component } from 'react'
import Chat from './Chat'
import bball from './b-ball.png'

export default class ChatPage extends Component {
  render() {
    return (
      <div className="App chat-box">
      <h4 className="App-title second-font">Welcome to Hoop Chat</h4>
        <div>
            <Chat loggedInUser={this.props.loggedInUser}/>

        </div>
          
        
        
      </div>
    )
  }
}

