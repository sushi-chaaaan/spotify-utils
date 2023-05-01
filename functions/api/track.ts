export const onRequestGet: PagesFunction<Bindings> = async (ctx) => {
  const requestUrl = new URL(ctx.request.clone().url)

  const trackUrl = requestUrl.searchParams.get('url')

  if (!trackUrl) {
    return new Response('Missing url parameter', { status: 400 })
  }
  const req = new Request(`${requestUrl.origin}/?url=${trackUrl}`, ctx.request)

  return ctx.env.API_WORKER.fetch(req)
}
