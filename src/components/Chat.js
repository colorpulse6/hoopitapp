import React, { Component } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios'
import config from '../config';

// const URL = 'ws://localhost:3030/wss/'
// const URL = window.location.origin.replace(/^http/, 'wss')
class Chat extends Component {
  constructor(props){
    super(props)
    this.state = {
      chat: [],
      content: '',
      name: this.props.loggedInUser.username,
      team: ''
      
    };
  }
  socket = io.connect('http://localhost:5001')

  

  componentDidMount() {
    var room = this.props.teamId;

    //ONLY BROADCAST TO SPECIFIC TEAM
    this.socket.on('connect', () => {
      this.socket.emit('room', room);
   });

    // Load the last 10 messages in the window.
    let id = this.props.teamId
       axios.get(`${config.API_URL}/team-messages/${id}`, {withCredentials: true})
       .then((res)=> {
        // this.socket.on('init', (msg) => {
        //   this.setState((state) => ({
        //     chat: [...state.chat, ...msg.reverse()],
        //   }), this.scrollToBottom);
          
         let msg = res.data;
          this.setState((state) => ({
            chat: [...state.chat, ...msg.reverse()],
          }), this.scrollToBottom);
    
        // });
       })
       .catch((err)=> {
         console.log(err + '   error setting chat state')
       })
    

    // Update the chat if a new message is broadcasted.
    this.socket.on('push', (msg) => {
      this.setState((state) => ({
        chat: [...state.chat, msg],
      }), this.scrollToBottom);
    });
  }
// Save the message the user is typing in the input field.
handleContent(event) {
  this.setState({
    content: event.target.value,
  });
}

//


// When the user is posting a new message.
handleSubmit(event) {
  console.log(event);

  // Prevent the form to reload the current page.
  // event.preventDefault();

  
  this.setState((state) => {
    console.log(state);
    console.log('this', this.socket);
    // Send the new message to the server.
    this.socket.emit('message', {
      name: state.name,
      content: state.content,
      team: this.props.teamId
    });

    // Update the chat with the user's message and remove the current message.
    
    return {
      chat: [...state.chat, {
        name: this.props.loggedInUser.username.split(' ').slice(0, -1).join(' '),
        content: state.content,
        team: state.team
      }],
      content: '',
    };
  }, this.scrollToBottom);
}

// Always make sure the window is scrolled down to the last message.
scrollToBottom() {
  const chat = document.getElementById('chat');
  chat.scrollTop = chat.scrollHeight;
}

  render() {
    if (!this.props.loggedInUser) {
      //REDIRECTS USER TO SIGN IN IF NOT LOGGED IN
      return <Redirect to='/sign-in' />
  }
    return (
      <div >
        <label  htmlFor="name" className="second-font">
          Hello {this.props.loggedInUser.username}
          
        </label>
        <div className="messages-container" id="chat" elevation={3}>
          {this.state.chat.map((message, index) =>
          
            <ChatMessage
              key={index}
              message={message.content}
              name={message.name}
              loggedInUser={this.props.loggedInUser}
            />,
          )}

        </div>
        <div className="chat-input ">
          <ChatInput
            ws={this.socket}
            content={this.state.content}
            handleContent={this.handleContent.bind(this)}
            onSubmitMessage={this.handleSubmit.bind(this)}
          />

        </div>
        
      </div>
    )
  }
}

export default Chat