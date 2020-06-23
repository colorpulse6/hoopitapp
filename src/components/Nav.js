import React from 'react';
import {Link} from 'react-router-dom'


export default function Nav(props) {
    return(
        <ul className="nav ">
            <li className="nav-item">
                <Link className="nav-link active myContainer" to="/">Landing</Link>
            </li>
            {
                props.loggedInUser ? (
                    <>

                    <li className="nav-item">
                       <Link className="nav-link" to="/user-main">Home</Link>
                    </li>
                    
                    <li className="nav-item">
                       <Link className="nav-link" to="/team-info">Teams</Link>
                    </li>

                    <li className="nav-item">
                            <button className="nav-link" onClick={props.onLogout}>Logout</button>
                    </li>

                    </>

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
    )
}
