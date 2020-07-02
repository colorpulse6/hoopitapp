import React from 'react';
import {Link} from 'react-router-dom'
import bball from './b-ball.png'


export default function Nav(props) {
    return(
        <div id="content-wrap" >
        <nav class="navbar navbar-expand-lg navbar-custom navbar-light ">
            
                
                    <Link to="/" ><img src={ bball } width="30" height="30" class="d-inline-block align-top" alt=""></img></Link>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    
                
            {
            props.loggedInUser ? (
                <div class="collapse navbar-collapse  justify-content-end " id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <Link className="nav-link" to="/user-main">Home<span class="sr-only">(current)</span></Link>
                    </li>
                    
                    <li class="nav-item">
                        <Link className="nav-link " to="/team-info">Teams</Link>
                            
                    </li>

                    <li className="nav-item">
                       <Link className="nav-link" to="/edit-profile">{props.loggedInUser.username}</Link>
                    </li>

                    <li class="nav-item">
                        <button className="logout" onClick={props.onLogout}>Logout</button>
                    </li>
                    </ul>
                </div>

                ) : (
                    <div class="collapse navbar-collapse justify-content-end " id="navbarNav">
                    <ul class="navbar-nav nav-content">
                    <li className="nav-item">
                         <Link className="nav-link" to="/sign-in">Sign in</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/sign-up">Sign up</Link>
                    </li>
                    </ul>
                    </div>
                )
            }
            
        </nav>

        </div>
        
    )
}

// <nav class="navbar navbar-expand-lg navbar-light bg-light">
// <ul class="navbar-nav mr-auto"></ul>
//     <li className="nav-item">
//     <Link to="/" ><img src={ bball } width="50" height="50" class="d-inline-block align-top" alt=""></img></Link>
//   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span class="navbar-toggler-icon"></span>
//   </button>
//   </li>

//     {
//         props.loggedInUser ? (
            
//             <div class="collapse navbar-collapse" id="navbarSupportedContent">
    

//       <li class="nav-item active">
//         <Link className="nav-link" to="/user-main">Home<span class="sr-only">(current)</span></Link>
//       </li>

      
//       <li class="nav-item dropdown">
//         <Link className="nav-link dropdown-toggle" id="navbarDropdown" to="/team-info" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Teams</Link>
//         <div class="dropdown-menu" aria-labelledby="navbarDropdown">
//           <a class="dropdown-item" href="#">Action</a>
//           <a class="dropdown-item" href="#">Another action</a>
//           <div class="dropdown-divider"></div>
//           <a class="dropdown-item" href="#">Something else here</a>
//         </div>
//       </li>

//       <li class="nav-item">
//         <button className="nav-link logout-btn btn-primary btn" onClick={props.onLogout}>Logout</button>
//       </li>
//             </div>
  
//      ) : (
//                     <>

//                     <li className="nav-item">
//                          <Link className="nav-link" to="/sign-in">Sign in</Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link className="nav-link" to="/sign-up">Sign up</Link>
//                     </li>
//                     </>
//                 )
//     </ul>
//     }
  
// </nav>
