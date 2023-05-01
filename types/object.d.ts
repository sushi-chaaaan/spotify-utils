type fetchedTrackResponse = {
  message: string
  track: SpotifyApi.TrackObjectFull
}

type trackResponse = {
  track: SpotifyApi.TrackObjectFull
  nowPlaying: string
  albumArtwork: SpotifyApi.ImageObject
}
