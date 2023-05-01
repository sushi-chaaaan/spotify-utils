export const onRequestGet: PagesFunction<Bindings> = async (ctx) => {
  const requestUrl = new URL(ctx.request.clone().url)

  const trackUrl = requestUrl.searchParams.get('url')

  if (!trackUrl) {
    return new Response('Missing url parameter', { status: 400 })
  }
  // const req = new Request(`${requestUrl.origin}/?url=${trackUrl}`, ctx.request)

  const { track, rawResponse } = (await ctx.env.API_WORKER.fetch(
    ctx.request
  )) as unknown as fetchedTrackResponse

  if (track === undefined) {
    return rawResponse
  }

  const nowPlaying = `#NowPlaying
${track.name} / ${track.artists.join(', ')} - ${track.album}
${trackUrl}
`
  const resp: trackResponse = {
    track,
    nowPlaying,
    albumArtworkUrl: track.album.images[0].url,
  }
  return new Response(JSON.stringify(resp), {
    headers: rawResponse.headers,
    status: rawResponse.status,
    statusText: rawResponse.statusText,
  })
}
