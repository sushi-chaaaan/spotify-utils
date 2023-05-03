import '@/src/styles/index.css'

import { FormEventHandler, useState } from 'react'

import { callApi } from '@/lib/callApi'

function IndexPage() {
  const [trackInfo, setTrackInfo] = useState<trackResponse | undefined>(
    undefined
  )

  const getTrack = async (url: string) => {
    const res = (await callApi(`/api/track?url=${url}`)) as trackResponse
    console.debug(res)
    return res
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.debug(e)
    const { value: trackUrl } = (e.target as HTMLFormElement).trackUrl
    getTrack(trackUrl)
      .then((res) => {
        setTrackInfo(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const TweetButton = ({ tweet }: { tweet: string }) => {
    return (
      <a
        className="twitter-share-button"
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          tweet
        )}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        Tweet
      </a>
    )
  }

  const TrackInfoSection = () => {
    return (
      <>
        {trackInfo && (
          <>
            <h3>Album Artwork:</h3>
            <img
              height={trackInfo.albumArtwork.height}
              src={trackInfo.albumArtwork.url}
              width={trackInfo.albumArtwork.width}
            />
            <h3>Track&apos;s #NowPlaying Tweet:</h3>
            <p>{trackInfo.nowPlaying}</p>
            <TweetButton tweet={trackInfo.nowPlaying} />
          </>
        )}
      </>
    )
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
          <h2>Example: get track artworks and #NowPlaying Tweet</h2>
          <form onSubmit={handleSubmit}>
            <input defaultValue="" name="trackUrl" type="text" />
            <input type="submit" value="Submit" />
          </form>
          <TrackInfoSection />
        </div>
      </div>
    </>
  )
}

export default IndexPage
