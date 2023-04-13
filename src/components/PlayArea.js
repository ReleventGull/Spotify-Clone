import { useEffect, useState } from 'react'
import {pausePlayback, resumePlayback, seekPosition, changeRepeatMode} from '../api'
import axios from 'axios'
const PlayArea = ({repeat, shuffle, setShuffle, setRepeat, currentSong, setIsPlaying, isPlaying}) => {
    const [ms ,setMs] = useState(0)
    const pausePlayPlayback = () => {
        setIsPlaying(pre => !pre)
        if (isPlaying) {
            pausePlayback()
        }else {
            resumePlayback()
        }
        
    }
    useEffect(() => {
        currentSong ? setMs(currentSong.progress_ms) : null
    }, [currentSong])
    
    const repeatClick = async() => {
        console.log("I was click")
        let toSend = ''
        switch(repeat) {
            case('off'):
                toSend = 'context'
                break
            case ('context'):
                toSend = 'track'
                break
            case ('track'):
                toSend = 'off'
        }
        await changeRepeatMode(toSend)
    
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
                    <button onClick={repeatClick} className={"repeatButton " + repeat}></button>
                </div>
                <div className='dragBar'>
                    <span>0:00</span>
                    <input value={ms} max={currentSong.item.duration_ms} onChange={
                        (e) => {
                            setMs(e.target.value)
                            seekPosition(Number(e.target.value))
                        }
                    
                    }type='range' />
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