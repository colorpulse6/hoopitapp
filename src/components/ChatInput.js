import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ChatInput extends Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
  }
  state = {
    message: '',
  }

  render() {
    return (
      <div >
      <form
        
        action="."
        onSubmit={e => {
          e.preventDefault()
          this.props.onSubmitMessage(this.state.message)
          this.setState({ message: '' })
        }}
      >
      <div>
        <input className="second-font chatinput"
            type="text"
            placeholder={'Enter message...'}
            value={this.props.content}
            onChange={this.props.handleContent}
          />
        
        <input type="submit" className="card-buttons chat-button" value={'Send'} />

      </div>
      </form>
      </div>
    )
  }
}

 