import React from 'react';
import {Link} from 'react-router-dom'
import bball from './b-ball.png'


export default function Nav(props) {
    return(
        <nav class="navbar navbar-light bg-light">
        <ul className="nav ">
            <li className="nav-item">
            <Link to="/" > 
                <img src={ bball } width="50" height="50" class="d-inline-block align-top" alt=""></img> 
            </Link>
                
            </li>
            {
                props.loggedInUser ? (
                    <div className="logged-in-container">

                    <li className="nav-item">
                       <Link className="nav-link" to="/user-main">Home</Link>
                    </li>
                    
                    <li className="nav-item">
                       <Link className="nav-link" to="/team-info">Teams</Link>
                    </li>

                    <li className="nav-item">
                       <Link className="nav-link" to="/edit-profile">{props.loggedInUser.username}</Link>
                    </li>

                    <li className="nav-item ">
                            <button className="nav-link logout-btn btn-primary btn" onClick={props.onLogout}>Logout</button>
                    </li>

                    </div>

                ) : (
                    <>

                    <li className="nav-item">
                         <Link className="nav-link" to="/sign-in">Sign in</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/sign-up">Sign up</Link>
                    </li>
                    </>
                )
            }
        </ul>
        </nav>
    )
}


// <!-- Image and text -->

//   <a class="navbar-brand" href="#">
//     <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="">
//     Bootstrap
//   </a>
