import React from 'react';

export default function Signup(props) {
    return(
        <form onSubmit={props.onSignUp} className="form-container">
            <div className="form-group" >
                <label htmlFor="exampleInputUsername">Username</label>
                <input type="text" className="form-control" id="exampleInputUsername" name="username" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control input" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputUsername">City</label>
                <input type="text" className="form-control input" id="location" name="location" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input name="password" type="password" className="form-control input" id="exampleInputPassword1" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}