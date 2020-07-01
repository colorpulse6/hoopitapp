import React from 'react';
import bball from './b-ball.png'

export default function Signin(props) {
    return(
        <form onSubmit={props.onSignIn} className="form-container card">
        <img className="bball" src= {bball}></img>
        <h2>Please Sign In</h2>
        
            <div className="form-group">
                <label htmlFor="exampleInputEmail1"></label>
                <input className="input" type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Email address" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1"></label>
                <input name="password" type="password" className="form-control input" id="exampleInputPassword1" placeholder="Password"/> 
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
