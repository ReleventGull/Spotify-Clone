import { useEffect, useState } from "react"
import { fetchProfile } from "../api"

const Profile = ({token}) => {
    const [profile, setProfile] = useState(null)

    const fetchUserData = async() => {
        console.log("TOKEN AGAIN", token)
    const response = await fetchProfile(token)
    console.log('response', response)
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
            </div>
        
        
        
        
        
        
        
        
        
    )
}
export default Profile