export const onRequestGet: PagesFunction<Bindings> = async (ctx) => {
  const trackUrl = new URL(ctx.request.url).searchParams.get('url')

  if (!trackUrl) {
    return new Response('Missing url parameter', { status: 400 })
  }

  return new Response('ok', { status: 200 })
}
