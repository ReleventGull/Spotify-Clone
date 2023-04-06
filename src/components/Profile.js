import { useEffect, useState } from "react"
import { fetchProfile, fetchUserTopItems, fetchUsersPlaylist } from "../api"

const Profile = () => {
    const [profile, setProfile] = useState(null)
    const [tracks, setUserTrack] = useState(null)
    const [artists, setArtists] = useState(null)
    const [playlists, setPlaylists] = useState(null)
    
    const fetchUserData = async() => {
        const token = localStorage.getItem('authorization')
        const response = await fetchProfile(token)
        const tracks = await fetchUserTopItems({token, limit: 4, offset: 0, item: 'tracks'})
        const artists = await fetchUserTopItems({token, limit: 8, offset: 0, item: 'artists'})
        const playlists = await fetchUsersPlaylist({token: token, limit: 8, offset: 0})
        console.log(playlists)
        setArtists(artists)
        setUserTrack(tracks)
        setProfile(response)
        setPlaylists(playlists)
}

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
    fetchUserData()
}, [])

    return (
        !profile ? null :
            <div className="profilePage">
                <div className="topContainerProfile">
                    <img className='profilePicture' src={profile.images[0].url}/>
                    <div>
                        <h4>Profile</h4>
                        <h1 className="display_name">{profile.display_name}</h1>
                        <p>{profile.followers.total} Follower{profile.followers.total > 1 ? 's' : null}</p>
                    </div>
                </div>
                <div className="topArtistsContainer">
                <h1>Top artists this month</h1>
                
                <div className="artistsContainer">
                    {
                        artists.items.map(art => 
                            <div className="artistsBox">
                                <img src={art.images[0].url}/>
                                <div className="artistNames">
                                    <h3>{art.name}</h3>
                                    <h4>{art.type[0].toUpperCase() + art.type.slice(1)}</h4>
                                </div>
                            </div>
                        )
                    }
                </div>
                
                <div className="topTracksContainer">
                    <h1>Top tracks</h1>
                    <div className="tracksContainer">
                        {
                            tracks.items.map((tr, index) =>
                                <div className="trackBox">
                                    <div className="indexBox">
                                        <h2>{index + 1}</h2>

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
                                )
                        }
                    </div>
                </div>
                
                <div className="mainPlayerlistsContainer">
                    <h1>Playlists</h1>
                    
                    <div className="playlistsContainer">
                    {
                            playlists.items.map(item =>
                                <div className="playerlistBox">
                                    <div className="imageBox">
                                       {item.images.length > 1 ? 
                            
                                        <img className="playlistsImage" src={item.images[0].url}/>
                                     :
                                     <div className="playstListsImage"/>
                                     }
                                    </div>
                                    <div className="playlistsNameBox">
                                    <h3>{item.name}</h3>
                                    </div>
                                    
                                </div>
                                )
                        }
                    </div>
                </div>
                
                </div>
            </div>
        
        
        
        
        
        
        
        
        
    )
}
export default Profile