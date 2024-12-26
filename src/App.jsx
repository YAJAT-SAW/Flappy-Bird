import './App.css'
import React, {useState, useRef, useEffect} from 'react'

export default function App() {
  const Pipe = (prop)=>{
    return(
      <div className="pipe" style={{
      height: `${prop.height}px`,
      top: `${prop.top}px`,
      rotate: `${prop.rotate}deg`,
      right: `${prop.right}px`,
      }}
      ref={prop.component}
      />
    )
  }
  const WINDOW = {
    height: 600,
    width: 350,
  };
  const BIRD = {
    height: 35,
    width: 40,
    ref: useRef(null),
    left: 100,
    right: WINDOW.width - 100,
  }
  const PIPE_WIDTH = 52;
  const SPEED = 2;
  const GRAVITY = 5;
  const MIN_GAP = 100;
  const MIN_HEIGHT = 100;
  const [pipeX, setPipeX] = useState(0-PIPE_WIDTH);
  const [bottomPipe, setBottomPipe] = useState(250)
  const [topPipe, setTopPipe] = useState(250);
  const [score, setScore] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [birdY, setBirdY] = useState(WINDOW.height / 2 - BIRD.height / 2);
  const bottomPipeRef = useRef(null);
  const topPipeRef = useRef(null);

  const generatePipes = () => {
    let bottomPipeHeight;
    let topPipeHeight;
 do {
    bottomPipeHeight = Math.floor(
      Math.random() * (WINDOW.height - MIN_GAP - MIN_HEIGHT)
    );
    topPipeHeight = WINDOW.height - bottomPipeHeight - MIN_GAP;
  } while (bottomPipeHeight < MIN_HEIGHT || topPipeHeight < MIN_HEIGHT);
    
  return { bottomPipeHeight, topPipeHeight };
  }

  const isColliding = () => {
  const birdElement = BIRD.ref.current;
  const topPipeElement = topPipeRef.current;
  const bottomPipeElement = bottomPipeRef.current;
  if(topPipeElement && bottomPipeElement && birdElement){
  const topPipeRect = topPipeElement.getBoundingClientRect();
  const bottomPipeRect = bottomPipeElement.getBoundingClientRect();
  const birdRect = birdElement.getBoundingClientRect();

  const isCollidingTop =
    birdRect.right > topPipeRect.left &&
    birdRect.left < topPipeRect.right &&
    birdRect.top < topPipeRect.bottom;

  const isCollidingBottom =
    birdRect.right > bottomPipeRect.left &&
    birdRect.left < bottomPipeRect.right &&
    birdRect.bottom > bottomPipeRect.top;

  const isNotInWindow =
    birdRect.top <= 0 || birdRect.bottom >= WINDOW.height;

  return isCollidingTop || isCollidingBottom || isNotInWindow;
  }
};
  

  const gameOver = () => {
    setIsStart(false);
    setBirdY(WINDOW.height / 2 - BIRD.height / 2);
    setPipeX(0 - PIPE_WIDTH);
    setScore(0);
    setBottomPipe(250);
    setTopPipe(250);
  };
  
  
  useEffect(()=>{
    let birdInterval;
    if(isStart){
     birdInterval = setInterval(()=>{
  setBirdY(prev=>prev+GRAVITY);
      //BIRD.ref.current.style.rotate = '90deg';
      },50)
    }else {
  clearInterval(birdInterval);
  }
    return ()=>clearInterval(birdInterval);
  },[isStart])
  useEffect(() => {
  let animationId = null;

  if (isStart) {
    const updatePipe = () => {
      setPipeX(prev => prev + SPEED);
      animationId = requestAnimationFrame(updatePipe);
    };
    animationId = requestAnimationFrame(updatePipe);
  }
  return () => cancelAnimationFrame(animationId);
}, [isStart]);
  
  
  useEffect(()=>{
    if(pipeX >= WINDOW.width){
      const Pipe = generatePipes();
      setPipeX(0-PIPE_WIDTH)
setBottomPipe(Pipe.bottomPipeHeight);
setTopPipe(Pipe.topPipeHeight);
    }
    if(pipeX == BIRD.right) setScore(prev=>prev+1);
    if(isColliding()) gameOver();
  },[pipeX])
  const ClickHandler = ()=>{
    if(!isStart) setIsStart(true);
    //console.log(isStart);
    //console.log(pipeX)
BIRD.ref.current.style.rotate = '-45deg';
      setBirdY(prev=>prev-30);
    setTimeout(()=>{
BIRD.ref.current.style.rotate = '0deg';
    },300)
  }
  return(
    <div className="background" onClick={ClickHandler}>
      <div className="score">
        {score}
      </div>
      {!isStart ? <div className="startNotification">
        Click To Start
      </div> : null}
      <Pipe height={topPipe} top={0} rotate={180} right={pipeX} component={topPipeRef}/>
      <div className="bird" 
        style={{top: `${birdY}px`}}
        ref={BIRD.ref}
        />
      <Pipe height={bottomPipe}
            top={WINDOW.height-bottomPipe}
            rotate={0} 
            right={pipeX}
            component={bottomPipeRef}
        />
    </div>
  )
}