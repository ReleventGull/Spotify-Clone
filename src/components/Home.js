import { useEffect, useState } from "react"
import axios from "axios"
const Home = () => {
const [recomendedTrack, setRecommendedTrack] = useState(null)
const [recentlyPlayed, setRecentlyPlayed] = useState(null)
const [showAll, setShowAll] = useState(false)
console.log(recomendedTrack)
    const convertTrackTime = (ms) => {
        let seconds = ms / 1000
        let arr = []
        ms = 300000
        let hours = Math.floor(seconds / 3600)
        hours >= 1  ? arr.push(hours) : (arr.length > 0 ? arr.push('0') : null)
        seconds = Math.floor(seconds - (hours * 3600)) 
        let minutes = Math.floor(seconds/60)
        minutes >= 1 ? arr.push(minutes) : (arr.length > 0 ? arr.push('0') : null)
        seconds = Math.floor(seconds - (minutes * 60))
        seconds >= 1 ? arr.push(seconds) : arr.push('0')
        return arr.map((time, index, arr) => 
            index == 0 ? String(time) : 
            time  < 9 ? `0${time}`
            : String(time)
        ).join(':')
    }

    useEffect(() => {
        axios.get('https://api.spotify.com/v1/me/player/recently-played', {
            headers: {
                Authorization: `Bearer ` + localStorage.getItem('authorization')
            },
            params: {
                limit: 5
            }
        })
        .then(result => {
            const items = result.data.items
            console.log('Recents', items)
            setRecentlyPlayed(items)
            const list = items.map(item => item.track.id).join(',')
             axios.get('https://api.spotify.com/v1/recommendations', {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('authorization')
                },
                params : {
                    seed_tracks: list,
                    limit: 20
                }
            }).then(result => setRecommendedTrack(result.data))
        })
        .catch(error => {
            console.error(error)
        })
    }, [])
    return (
        <div className="homePage">
            <div className="recentAlbumsHome">
                <div className="recentTracksContainer">
                    <h1>Good Afternoon</h1>
                    <div className="mainBox">
                        <h3>Recently Played</h3>
                    {
                        !recentlyPlayed ? <h3>Loading...</h3>: recentlyPlayed.map( (tr, index) => 
                            <div className="trackBox">
                            <div className="indexBox">
                                <h2 className="trackNum">{index + 1}</h2>
                                <img onClick={async() => 
                                
                                axios.put('https://api.spotify.com/v1/me/player/play?device_id=' + '249292437d94ba47ef9d2dffd52e7967cf63b351',
                                {
                                    uris: [tr.track.uri],
                                },
                                {
                                    headers: {
                                      Authorization: 'Bearer ' + localStorage.getItem('authorization')
                                    }
                                })
                            }
                                className="playButton"src='/images/Spotify-Play-Button.png' />
                            </div>
                            <img className='topTrackImg' src={tr.track.album.images[0].url} />
                            <div className="trackNames">
                                <h2>{tr.track.name}</h2>
                                <h4>{tr.track.artists.map(art => art.name).join(', ')}</h4>
                                
                            </div>
                            <div className="albumName">
                                <h4>{tr.track.album.name}</h4>
                            </div>
                            <div className="songLength">
                            <h4>{convertTrackTime(tr.track.duration_ms)}</h4>
                            </div>
                        </div>
                            )}
                    </div>
                </div>
                <div className="recommendedTracks">
                    <h3>Recommended Tracks</h3>
                    {
                        !recomendedTrack ? <h3>Loading...</h3> : 
                        recomendedTrack.tracks.slice(0, showAll ? recomendedTrack.tracks.length : 6).map((tr, index) =>
                        <div className="trackBox">
                        <div className="indexBox">
                            <h2 className="trackNum">{index + 1}</h2>
                            <img onClick={async() => 
                            axios.put('https://api.spotify.com/v1/me/player/play?device_id=' + '249292437d94ba47ef9d2dffd52e7967cf63b351',
                            {
                                uris: [tr.uri],
                            },
                            {
                                headers: {
                                  Authorization: 'Bearer ' + localStorage.getItem('authorization')
                                }
                            })
                        }
                            className="playButton"src='/images/Spotify-Play-Button.png' />
                        </div>
                        <img className='topTrackImg' src={tr.album.images[0].url} />
                        <div className="trackNames">
                            <h2>{tr.name}</h2>
                            <h4>{tr.artists.map(art => art.name).join(', ')}</h4>
                        </div>
                        <div className="albumName">
                            <h4>{tr.album.name}</h4>
                        </div>
                        <div className="songLength">
                        <h4>{convertTrackTime(tr.duration_ms)}</h4>
                        </div>
                    </div>
                        )}
                        <h4 onClick={() => setShowAll((pre) => !pre)}>{showAll ? 'Hide' : 'Show All'}</h4>
                </div>
            </div>
        </div>
    )
}

export default Home 