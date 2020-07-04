import React from 'react';
import bball from '../images/b-ball.png'
import nextButton from '../images/next-button.png'

export default function Signin(props) {
    return(
        <div className="page-containers">
        <form onSubmit={props.onSignIn} className="form-container">
        <img className="bball" src= {bball}></img>
        <h2 className="second-font">Please Sign In</h2>
        
            <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="second-font">Email</label>
                <input className="input" type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="second-font">Password</label>
                <input name="password" type="password" className="form-control input" id="exampleInputPassword1" /> 
            </div>
            {props.error?  <div>{props.error}</div>: null}
            <button type="submit" className="card-buttons">Submit <img className="next-button" src={nextButton}></img></button>
        </form>
        </div>
    )
}
