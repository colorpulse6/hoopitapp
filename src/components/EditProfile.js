import React from 'react';

export default function EditProfile() {
    return(
        <div>
        

        <form className="form-container">
        <h1>Edit Profile Page</h1>
            <div class="form-group">
                <label for="changeName"></label>
                <input type="text" class="form-control" id="changeName" aria-describedby="changeName" placeholder="Change Name" name="changeName"></input>
                <small id="emailHelp" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
                <label for="changeCity"></label>
                <input type="password" class="form-control" id="changeCity" placeholder="Change City" name="changeCity"></input>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        
        
        </div>
    )
}
