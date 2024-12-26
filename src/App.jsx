import './App.css'
import React, {useState, useRef, useEffect} from 'react'

export default function App() {
  const Pipe = (prop)=>{
    return(
      <div className="pipe" style={{
      height: `${prop.height}px`,
      top: `${prop.top}px`,
      transform: `rotate(${prop.rotate}deg)`,
      right: `${prop.right}px`
      }}/>
    )
  }
  const WINDOW = {
    height: 600,
    width: 350,
  };
  const PIPE_WIDTH = 52;
  const SPEED = 5;
  const [pipeX, setPipeX] = useState(0-PIPE_WIDTH);
  const [bottomPipe, setBottomPipe] = useState(250)
  const [topPipe, setTopPipe] = useState(250);
  const [score, setScore] = useState(0);
  const [isStart, setIsStart] = useState(true);

  useEffect(()=>{
    let pipeInterval;
    if(isStart){
      pipeInterval = setInterval(()=>{
        setPipeX(pipeX+SPEED);
        console.log(pipeX);
      })
    }
    return clearInterval(pipeInterval);
  },[])
  return(
    <div className="background">
      <div className="score">
        {score}
      </div>
      <Pipe height={topPipe} top={0} rotate={180} right={pipeX}/>
      <div className="bird" />
      <Pipe height={bottomPipe}
            top={WINDOW.height-bottomPipe}
            rotate={0} 
            right={pipeX}/>
    </div>
  )
}