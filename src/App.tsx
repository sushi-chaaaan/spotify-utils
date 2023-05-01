import '@/src/App.css'

import { FormEventHandler, useState } from 'react'

import { callApi } from '@/lib/callApi'

// import viteLogo from '/vite.svg'
// import reactLogo from '@/src/assets/react.svg'

function App() {
  // const [count, setCount] = useState(0)
  const [image, setImage] = useState<SpotifyApi.ImageObject>({
    height: 0,
    url: '',
    width: 0,
  })

  const getArtwork = async (url: string) => {
    const res = (await callApi(`/api/track?url=${url}`)) as trackInfo
    console.debug(res)
    return res.rawData.album.images[0]
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.debug(e)
    const { value: trackUrl } = (e.target as HTMLFormElement).trackUrl
    getArtwork(trackUrl)
      .then((res) => {
        setImage(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div>
        <h1>What&apos;s this?</h1>
        <p>
          This is a utility tools for Spotify:
          <br />
          <ul>
            <li>Search for songs</li>
            <li>Search for artists</li>
            <li>Get artworks</li>
          </ul>
        </p>

        <div>
          <h2>Example: get track artworks</h2>
          <form onSubmit={handleSubmit}>
            <input defaultValue="" name="trackUrl" type="text" />
            <input type="submit" value="Submit" />
          </form>
          <img height={image.height} src={image.url} width={image.width} />
        </div>
      </div>
      {/* <div>
        <a href="https://vitejs.dev" rel="noreferrer" target="_blank">
          <img alt="Vite logo" className="logo" src={viteLogo} />
        </a>
        <a href="https://react.dev" rel="noreferrer" target="_blank">
          <img alt="React logo" className="logo react" src={reactLogo} />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
