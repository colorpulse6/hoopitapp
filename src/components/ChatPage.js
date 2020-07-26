import React, { Component } from 'react'
import Chat from './Chat'

export default class ChatPage extends Component {
  render() {
    return (
      <div className="App chat-box">
        <h4 className="App-title second-font chat-header">
          Welcome to Hoop Chat
        </h4>
        <div>
          <Chat
            loggedInUser={this.props.loggedInUser}
            teamId={this.props.teamId}
          />
        </div>
      </div>
    );
  }
}

