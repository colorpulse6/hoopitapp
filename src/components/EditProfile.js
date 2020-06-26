import React from 'react';

export default function EditProfile() {
    return(
        <div>
        <h1>Edit Profile Page</h1>
        <form>
           <p>Change City</p> 
           <input type="text" name="changeCity"></input>

           <p>Change Name</p> 
           <input type="text" name="changeName"></input>
        </form>
        
        
        </div>
    )
}
