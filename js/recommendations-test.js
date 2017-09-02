var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

console.log("In the index");

spotifyApi.clientCredentialsGrant()
    .then(function(data) {
            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);

            spotifyApi.getRecommendations({ min_energy: 0.7, min_danceability: 0.5, min_energy: 0.7, seed_tracks: ['1NZWiuy0mlnsrcYL2dhKt6'], limit: 100, max_liveness: 0.1, target_popularity: 50 })
                .then(function(data) {
                    console.log(data.body);
                }, function(err) {
                    console.log(err);
                });
        },
        function(err) {
            console.log('Something went wrong when retrieving an access token', err.message);
        });