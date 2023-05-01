export const onRequestGet: PagesFunction<Bindings> = async (ctx) => {
  const trackUrl = new URL(ctx.request.url).searchParams.get('url')

  if (!trackUrl) {
    return new Response('Missing url parameter', { status: 400 })
  }

  const req = new Request(
    'https://now-playing.sushichan.live',
    ctx.request.clone()
  )

  return ctx.env.API_WORKER.fetch(req)
}
