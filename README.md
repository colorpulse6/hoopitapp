# hoopitapp

## Description
Organize basketball games in your city

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **See Court Map** As an anon I can search for courts in my city that have been added by users
- **Signup** As an anon I can sign up to the platform and create my account
- **Login** As a user I can login to my account
- **Logout** As a user I can log out of my account
- **Create a Game** As a user I can create a new basketball game
- **Join a Game** As a user I can join an existing game
- **Create a New Team** As a user I can create a new team
- **Join an Existing Team** As a user I can join an existing team
- **Edit Game** As a user I can edit my games' members, location, date, and the winner of the game
- **Edit Profile** As a user I can edit my profile 

## Backlog

Calender:
- Add a calender function to schedule games and save them to the game model

Forum:
- Communicate with other players to organize games via  a forum

Chat:
- Communicate with other players to organize games via  a chat implementation

Tournaments:
- Enable users to build their own tournaments 

Referees: 
- Enable users to act as referees in games

Rules:
- Enable users to add or remove rules from games

# Client

## Routes

- / - Homepage
- /auth/signup - Signup form
- /auth/login - Login form
- /user/:id - User Homepage
- /user/:id - User Homepage
- /user/:id/teams - Create or join a team
- /user/:id/games - Create or join a game
- /user/:id/profile - Edit profile
- 404

## Pages

- Home Page/City Map (public)
- Signup Page (anon only)
- Login Page (anon only)
- User Home Page (user only)
- User Teams Page (user only)
- User Team Detail page (user only)
- User Games Page (user only)
- User Game Detail Page (user only)

## Components

- Create Game Component
    - Input: location: string, type: string, date: string, 
- Join Game Component
    - Input: name: string
- Create Team Component
    - Input: name: string, players: array, homeTown: string
- Join Team Component
    -Input: name: string

## IO

## Services

- Auth Service
    - auth.login(user)
    - auth.signup(user)
    - auth.logout()
    - auth.user()
    - auth.getUser()

- Games Service
    - games.list()
    - games.create(data)
    - games.detail(id)

- Teams Service
    - teams.list()
    - teams.create(data)
    - teams.detail(id)

# Server

## Models

User Model

```
username - String // required
email - String // reqquired & unique
password - String // required
imageUrl - String
location - String
gamesCreated - Number
gamesPlayed - Number
gamesWon - Number
gamesLost - Number
team - String
```

Games Model

```
createdBy - [ObjetId<User>]
date - String
location - String
players - [ObjectId<User>]
type - String
structure - String
-spotsAvailable - Number
```

Teams Model

```
owner - [ObjetId<User>]
teamName - String
players - [ObjetId<User>]
homeTown - String
gamesPlayed - Number
gamesWon - Number
gamesLost - Number
```

## API Endpoints/Backend Routes

- GET /auth/user
- POST /auth/signup
    body:
        - username
        - email
        - password
        - location
        - imageUrl
- POST /auth/login
    body:
        - username
        - password
- POST /auth/logout
    body: (empty)
- GET /user/join-game
- POST /user/join-game
    body:
        - name
- GET /user/create-game
- POST /user/create-game
    body:
        - date
        - location
        - type
        - structure
    reference: 
        - createdBy [ObjectId<User>]   
- GET /game/:id
- GET /user/join-team
- POST /user/join-team
    body:
        - teamName
- GET /user/create-team
- POST /user/create-team
    body:
        - date
        - homeTown
    reference: 
        - owner [ObjectId<User>]  

## Links

### Trello
[https://trello.com/b/fudcI5E0/basketball-app]

### Git
[https://github.com/colorpulse6/hoopitapp-server]
[https://github.com/colorpulse6/hoopitapp]

### Deployment


### Slides
[https://docs.google.com/presentation/d/1ITWaidwNwHyAy3hsINt5oreKjPL4oQH-_L3dVBlzcZs/edit?usp=sharing]









  
    







