export const onRequestGet: PagesFunction<Bindings> = async (ctx) => {
  const requestUrl = new URL(ctx.request.clone().url)

  const trackUrl = requestUrl.searchParams.get('url')

  if (!trackUrl) {
    return new Response('Missing url parameter', { status: 400 })
  }
  // const req = new Request(`${requestUrl.origin}/?url=${trackUrl}`, ctx.request)

  const response = await ctx.env.API_WORKER.fetch(ctx.request)
  if (!response.ok) {
    return response
  }

  const { track } = await response.json<fetchedTrackResponse>()
  const nowPlaying = `#NowPlaying
${track.name} / ${track.artists.map((artist) => artist.name).join(', ')}${
    track.album.name && track.album.name != '' ? ` - ${track.album.name}` : ''
  }
${trackUrl}
`
  const resp: trackResponse = {
    track,
    nowPlaying,
    albumArtwork: track.album.images[0],
  }

  return new Response(JSON.stringify(resp), {
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
  })
}
