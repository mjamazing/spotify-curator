// This is not working right now because of problems with the Spotify API
// Have to authorize the application but the code is not passing in correctly in the node module

var SpotifyWebApi = require('spotify-web-api-node');

var credentials = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI
};

var spotifyApi = new SpotifyWebApi(credentials);

// The code that's returned as a query parameter to the redirect URI
var code = process.env.SPOTIFY_AUTHORIZE_CODE;

// Retrieve an access token and a refresh token
spotifyApi.authorizationCodeGrant(code)
    .then(function(data) {
        return spotifyApi.createPlaylist(process.env.SPOTIFY_USER, 'Elvis Presley Playlist', { 'public': false });
    }).then(function(data) {
        // Get the playlist ID
        var playlistID = data.body.id;
        return spotifyApi.searchArtists('Elvis Presley');
    }).then(function(data) {
        return spotifyApi.getArtistTopTracks(data.body.artists.items[0].id, 'US');
    }).then(function(data) {
        // Add top tracks for the artist
        spotifyApi.addTracksToPlaylist(process.env.SPOTIFY_USER, playlistID, data.body.tracks.map(function(t) { return t.id; }));
        console.log(data.body);
    }).catch(function(err) {
        console.log("Something went wrong: " + err);
    });