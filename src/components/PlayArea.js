import { useState } from "react"

const PlayArea = ({song}) => {
 const [ms, setMs] = useState(0)
    return (
        <div className="playArea">
            <div className="playBox one">
                <img />
                <div>
                    <h2></h2>
                    <h2></h2>
                </div>
            </div>
            
            <div className="playBox two">
                <div className="playAreaButtonSelection">
                    <button className="shuffleButton"></button>
                    <button className="forward Reverse"></button>
                    <button className="pauseButton"></button>
                    <button className="forward"></button>
                    <button className="repeatButton"></button>
                </div>
                <div className='dragBar'>
                    <span>0:00</span>
                    <input value={ms} max={100} onChange={(e) => setMs(e.target.value)}type='range' />
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