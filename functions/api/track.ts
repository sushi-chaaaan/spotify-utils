export const onRequestGet: PagesFunction<Bindings> = async (ctx) => {
  const trackUrl = new URL(ctx.request.url).searchParams.get('url')

  if (!trackUrl) {
    return new Response('Missing url parameter', { status: 400 })
  }

  const baseUrl = 'https://now-playing.sushichan.live'

  const req = new Request(`${baseUrl}?url=${trackUrl}`, ctx.request)

  return ctx.env.API_WORKER.fetch(req)
}
