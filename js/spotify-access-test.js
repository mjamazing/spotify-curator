var SpotifyWebApi = require('spotify-web-api-node');
const util = require('util');

/**
 * This example retrives an access token using the Client Credentials Flow. It's well documented here:
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

/*
 * https://developer.spotify.com/spotify-web-api/using-scopes/
 */

console.log("PROCESS " + util.inspect(process));
console.log("PROCESS_ENV " + util.inspect(process.env));
console.log("SPOTIFY_CLIENT_ID: " + process.env.SPOTIFY_CLIENT_ID);
console.log("SPOTIFY_CLIENT_SECRET: " + process.env.SPOTIFY_CLIENT_SECRET);

/**
 * Set the credentials given on Spotify's My Applications page.
 * https://developer.spotify.com/my-applications
 */
var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});
//console.log("spotifyApi " + util.inspect(spotifyApi));

// clientId: process.env.SPOTIFY_CLIENT_ID,
// clientSecret: process.env.SPOTIFY_CLIENT_SECRET,

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
    .then(function(data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
        console.log('Something went wrong when retrieving an access token', err.message);
    });