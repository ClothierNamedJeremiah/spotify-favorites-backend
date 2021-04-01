# Spotify Favorites
Spotify Favorites is a personalized dashboard that displays your most listened to songs and artists in Spotify. Discover your most listened to songs and artists in Spotify.


## Repository Content

The following repository is an Express server used for Spotify's **Refreshable user authorization**: [Authorization Code Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow). Running this server, you can easily authenticate and gain access to the Spotify's API.

```
./
 |- config.js: reads configuration variables
 |- server.js: express server
```


## Getting Started

1. Create an Application on [Spotify's Developer Dashboard](https://developer.spotify.com/dashboard/applications).
2. Use the `CLIENT_ID` and `CLIENT_SECRET` obtained from step (1) and create a `.env` file in the root directory to store your configuration variables.

```
PORT=3001

# Spotify Redirect URIs
SERVER_REDIRECT_URI=http://localhost:3001/callback/
CLIENT_REDIRECT_URI=https://localhost:3000/

# Spotify Credentials
CLIENT_ID=YOUR_CLIENT_ID_HERE
CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
```


## Installation

You can install and run the Express server with two simple commands.

1. Install all the dependencies `npm install`
2. Run the devlopment server `npm run start:dev`
