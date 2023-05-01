type fetchedTrackResponse = {
  track: SpotifyApi.TrackObjectFull | undefined
  rawResponse: Response
}

type trackResponse = {
  track: SpotifyApi.TrackObjectFull
  nowPlaying: string
  albumArtworkUrl: string
}
