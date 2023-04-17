import { useEffect, useState } from 'react'
import {pausePlayback, startResumePlayback, seekPosition, changeRepeatMode, changeShuffle, getPlayerbackState} from '../api'
import axios from 'axios'
const PlayArea = () => {
    const [currentSong, setCurrentSong] = useState(null)
    const [isPlaying, setIsPlaying ] = useState(false)
    const [repeat, setRepeat] = useState(null)
    const [shuffle, setShuffle] = useState(null)
    const [ms ,setMs] = useState(0)
    
    useEffect(() => {
        getPlayer()
        if (isPlaying) {
         let time = setInterval(() => {
            getPlayer()
         }, 500)
         if (!isPlaying) {
            clearInterval(time)
         }
        }
    }, [isPlaying])
    
    const getPlayer = async() => {   
        const response = await getPlayerbackState(localStorage.getItem('authorization'))
        if(response.item.name) {
            setIsPlaying(response.is_playing)
            setCurrentSong(response)
            setShuffle(response.shuffle_state)
            setRepeat(response.repeat_state)
            return response
        }
    }

    const pausePlayPlayback = () => {
        if (isPlaying) {
            pausePlayback()
        }else {
            startResumePlayback()
        }
        
    }
    
    useEffect(() => {
        currentSong ? setMs(currentSong.progress_ms) : null
    }, [currentSong])
    
    const repeatClick = async() => {
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
                    <h2>{currentSong.item.name  == null ? "" : currentSong.item.name}</h2>
                    <h3>{currentSong.item.artists[0].name}</h3>
                </div>
            </div>
            
            <div className="playBox two">
                <div className="playAreaButtonSelection">
                    <button onClick={() => changeShuffle(!shuffle)}className={"shuffleButton " + shuffle}></button>
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