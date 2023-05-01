export const onRequestGet: PagesFunction<Bindings> = async (ctx) => {
  const trackUrl = new URL(ctx.request.url).searchParams.get('url')

  if (!trackUrl) {
    return new Response('Missing url parameter', { status: 400 })
  }

  return ctx.env.API_WORKER.fetch(ctx.request.clone(), {
    method: 'GET',
    body: new URLSearchParams({ url: trackUrl }),
  })
}
