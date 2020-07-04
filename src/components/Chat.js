import React, { Component } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import { Redirect } from 'react-router-dom';

const URL = 'wss://hoopitapp.herokuapp.com:3030/wss'
// const URL = 'ws://localhost:3030/wss/'
// const URL = window.location.origin.replace(/^http/, 'wss')

class Chat extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: this.props.loggedInUser.username,
      messages: [],
      flag: true
    }
    this.ws = new WebSocket(URL)
  }
  
  
 

  

  componentDidMount() {
    console.log(this.ws)
    setTimeout(() => {
      this.ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log('connected')
        
        
      }
    }, 1000);
    

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      this.addMessage(message)
      console.log(evt.data + 'WHAT IS THIS?')
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.ws = new WebSocket(URL);
      this.setState({
        flag: !this.state.flag 
      })
    }
    this.setState({
      flag: !this.state.flag 
    })
  }

  addMessage = message => {
    this.setState(state => ({ messages: [message, ...state.messages] }))
    console.log(this.state.messages + ':   messages')

  }

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const date = new Date()
    const message = { name: this.props.loggedInUser.username.split(' ').slice(0, -1).join(' '), message: messageString, date:date  }
    setTimeout(() => {
      this.ws.send(JSON.stringify(message))
    }, 1000);
   
    this.addMessage(message)
    

  }

  render() {
    if (!this.props.loggedInUser) {
      //REDIRECTS USER TO SIGN IN IF NOT LOGGED IN
      return <Redirect to='/sign-in' />
  }
    return (
      <div >
        <label htmlFor="name" className="second-font">
          Hello {this.props.loggedInUser.username}
          
        </label>
        <div className="messages-container">
          {this.state.messages.map((message, index) =>
            <ChatMessage
              key={index}
              message={message.message}
              name={message.name}
              loggedInUser={this.props.loggedInUser}
            />,
          )}

        </div>
        <div className="chat-input ">
          <ChatInput
            ws={this.ws}
            onSubmitMessage={messageString => this.submitMessage(messageString)}
          />

        </div>
        
      </div>
    )
  }
}

export default Chat