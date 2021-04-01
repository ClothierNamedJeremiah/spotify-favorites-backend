const axios = require('axios');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const {
  PORT,
  SERVER_REDIRECT_URI,
  CLIENT_REDIRECT_URI,
  CLIENT_ID,
  CLIENT_SECRET,
} = require('./config');

/* Server */
var stateKey = 'spotify_auth_state';
const app = express();
app.use(cors())
  .use(cookieParser());

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
 var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

/** Login endpoint that the browser requests  */
app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // application requests authorization
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: SERVER_REDIRECT_URI,
    scope: 'user-top-read',
    state: state,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
});

/** Redirect route called after accepting Spotify Scopes */
app.get('/callback', (req, res) => {
  console.log(res.statusCode);

  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/' +
      new URLSearchParams({ error: 'state_mismatch' }).toString()
    );
  } else {
    res.clearCookie(stateKey);
    let queryString = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: SERVER_REDIRECT_URI,
    }).toString();

    
    axios.post('https://accounts.spotify.com/api/token', queryString, {
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
    })
      .then((response) => {
        const {
          access_token,
          token_type,
          expires_in,
          refresh_token,
          scope,
        } = response.data;
        queryString = new URLSearchParams({ access_token }).toString();
        res.redirect(`${CLIENT_REDIRECT_URI}?${queryString}`);
      })
      .catch((error) => {
        queryString = new URLSearchParams({ error: 'access_denied' }).toString();
        res.redirect(`${CLIENT_REDIRECT_URI}?${queryString}`);
      });
  }

  

});

app.listen(PORT, () => {
  console.log(`Server started on: ${PORT}`);
});
