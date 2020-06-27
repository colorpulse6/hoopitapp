import React, { Component } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

const URL = 'ws://localhost:3030'

class Chat extends Component {
  state = {
    name: this.props.loggedInUser.username,
    messages: [],
  }

  ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
      
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      this.addMessage(message)
      console.log(evt.data)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }

  addMessage = message =>
    this.setState(state => ({ messages: [message, ...state.messages] }))

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const date = new Date()
    const message = { name: this.props.loggedInUser.username.split(' ').slice(0, -1).join(' '), message: messageString, date:date  }
    this.ws.send(JSON.stringify(message))
    this.addMessage(message)
  }

  render() {
    return (
      <div>
        <label htmlFor="name">
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