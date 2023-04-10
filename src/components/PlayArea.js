import {pausePlayback, resumePlayback} from '../api'
import axios from 'axios'
const PlayArea = ({currentSong, setIsPlaying, isPlaying}) => {

    const pausePlayPlayback = () => {
        setIsPlaying(pre => !pre)
        if (isPlaying) {
            pausePlayback()
        }else {
            resumePlayback()
        }
        
    }
    return (
        currentSong ? 
        <div className="playArea">
            <div className="playBox one">
                <img />
                <div className="playbackNames">
                    <h2>{currentSong.item.name}</h2>
                    <h3>{currentSong.item.artists[0].name}</h3>
                </div>
            </div>
            
            <div className="playBox two">
                <div className="playAreaButtonSelection">
                    <button className="shuffleButton"></button>
                    <button onClick={ () => {
                            axios.post('https://api.spotify.com/v1/me/player/previous', {}, {
                                headers: {
                                    'Authorization': `Bearer ${window.localStorage.getItem('authorization')}`
                                }
                            }).then(result => result.json)
                            .catch(error => {
                                console.log("There was an error making the skip", error)
                                throw error
                            })

                    }}className="forward Reverse"></button>
                    <button onClick={() => pausePlayPlayback()}className={'pauseButton ' + isPlaying}></button>
                    <button onClick={ () => {
                            axios.post('https://api.spotify.com/v1/me/player/next', {}, {
                                headers: {
                                    'Authorization': `Bearer ${window.localStorage.getItem('authorization')}`
                                }
                            }).then(result => result.json)
                            .catch(error => {
                                console.log("There was an error making the skip", error)
                                throw error
                            })

                    }} className="forward"></button>
                    <button className="repeatButton"></button>
                </div>
                <div className='dragBar'>
                    <span>0:00</span>
                    <input value={currentSong.progress_ms} max={currentSong.item.duration_ms} onChange={(e) => console.log(e.target.value)}type='range' />
                    <span>0:00</span>
                </div>
                <div>
                    
                </div>
            </div>
            
            <div className="playBox three">
                
            </div>
        </div> 
        
        : 
        <div className="playArea">
        <div className="playBox one">
            <img />
            <div className="playbackNames">
                <h2></h2>
                <h3></h3>
            </div>
        </div>
        
        <div className="playBox two">
            <div className="playAreaButtonSelection">
                <button className="shuffleButton"></button>
                <button className="forward Reverse"></button>
                <button className={'pauseButton ' + isPlaying}></button>
                <button className="forward"></button>
                <button className="repeatButton"></button>
            </div>
            <div className='dragBar'>
                <span>0:00</span>
                <input type='range' />
                <span>0:00</span>
            </div>
            <div>
                
            </div>
        </div>
        
        <div className="playBox three">
            
        </div>
    </div> 
        
        
        
    )
}
export default PlayArea