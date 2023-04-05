import { useEffect, useState } from "react"
import { fetchProfile, fetchUserTopItems } from "../api"

const Profile = () => {
    const [profile, setProfile] = useState(null)
    const [tracks, setUserTrack] = useState(null)
    const [artists, setArtists] = useState(null)
    const fetchUserData = async() => {
        const token = localStorage.getItem('authorization')
        const response = await fetchProfile(token)
        const tracks = await fetchUserTopItems({token, limit: 4, offset: 0, item: 'tracks'})
        const artists = await fetchUserTopItems({token, limit: 6, offset: 0, item: 'artists'})
        console.log(artists)
        setArtists(artists)
        setUserTrack(tracks)
        setProfile(response)
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
                </div>
            </div>
        
        
        
        
        
        
        
        
        
    )
}
export default Profile