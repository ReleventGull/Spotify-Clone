import { useState, useEffect} from "react"
import axios from 'axios'
const LikedSongs = () => {
    const [tracks, setTracks] = useState([])
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
        axios.get('https://api.spotify.com/v1/me/tracks', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authorization')
            },
            params: {
                limit: 50
            }
        }).then(result => setTracks(result.data.items))
    }, [])

    return (
        <div className="likedPage">
            <div className="topLikedPage">
                <img src={'/images/LikedIcon.png'}/>
                    <div className="containerAfterImg">
                        <h4>Playlist</h4>
                        <h1>Liked Songs</h1>
                    </div>
            </div>
            <div className="containerSearch">
                <div className="leftSide">
                    <img className="playButtonLiked" src='/images/Spotify-Play-Button.png'/>
                </div>
                <div className="rightSide">
                <input placeholder="Search for A Song"/>
                </div>
            </div>   
            <div className="categories">
                    <div className="categoriesList">
                    <h2>#</h2>
                    <h2>Title</h2>
                    <h2>Album</h2>
                    <h2>Duration</h2>
                    </div>
                </div>
            <div className="likedTracks">
                {
                    tracks.map((tr, index) => 
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
    )
}
export default LikedSongs