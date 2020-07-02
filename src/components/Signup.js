import React from 'react';
import bball from './b-ball.png'


export default function Signup(props) {
    return(
        <div className="page-containers">

<form onSubmit={props.onSignUp} className="form-container">
        <img className="bball" src= {bball}></img>
        <h2 className="primary-font">Join hoopitApp</h2>
            <div className="form-group" >
                <label htmlFor="exampleInputUsername" className="second-font">Your Name</label>
                <input type="text" className="form-control" id="exampleInputUsername" name="username" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="second-font">Email address</label>
                <input type="email" className="form-control input" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />
                <small id="emailHelp" className="form-text text-muted second-font">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputUsername" className="second-font">City</label>
                <input type="text" className="form-control input" id="location" name="location" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="second-font">Password</label>
                <input name="password" type="password" className="form-control input" id="exampleInputPassword1" />
            </div>
            <button type="submit" className="card-buttons">Submit</button>
        </form>

        </div>
        

    )
}