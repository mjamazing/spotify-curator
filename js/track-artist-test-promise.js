var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

console.log("In the index");

spotifyApi.clientCredentialsGrant()
    .then(function(data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);

        spotifyApi.searchArtists('Elvis Presley')
            .then(function(data) {
                console.log(data.body.artists.items[0].id + " " + data.body.artists.items[0].name);
            }).catch(function(err) {
                console.log("Something went wrong: " + err);
            });

        // spotifyApi.getAudioFeaturesForTrack('3Qm86XLflmIXVm1wcwkgDK')
        //     .then(function(data) {
        //         console.log(data.body);
        //     }, handleError(err));

        // spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
        //     .then(function(data) {
        //         console.log('Albums information', data.body);
        //     }, handleError(err));
    });