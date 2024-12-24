import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Game } from './components/Game/Game';
import { WordsActionsList } from './components/WordsActionsList/WordsActionsList';
import { generateNewObject } from './helpers/helpers';
import { Floors } from './types/IFloor';


const gameStatsInitial = {playerPosition: {
  prev: [4, 5],
  current: [4, 5],
  },
  score: 0,
}

const App: React.FC = () => {
  const initial:Floors = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, generateNewObject(),  generateNewObject(),  generateNewObject(),  generateNewObject(),  generateNewObject(), generateNewObject(), generateNewObject(),  generateNewObject(), generateNewObject(), generateNewObject(), generateNewObject()],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, generateNewObject(),  generateNewObject(),  generateNewObject(),  generateNewObject(),  generateNewObject(), generateNewObject(), generateNewObject(),  generateNewObject(), generateNewObject(), generateNewObject(), generateNewObject()],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, generateNewObject(),  generateNewObject(),  generateNewObject(),  generateNewObject(),  generateNewObject(), generateNewObject(), generateNewObject(),  generateNewObject(), generateNewObject(), generateNewObject(), generateNewObject()],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, generateNewObject(),  generateNewObject(),  generateNewObject(),  generateNewObject(),  generateNewObject(), generateNewObject(), generateNewObject(),  generateNewObject(), generateNewObject(), generateNewObject(), generateNewObject()],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,  0, 0,  0,0, generateNewObject(),  generateNewObject(), generateNewObject(), generateNewObject(), generateNewObject()],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, generateNewObject(),  generateNewObject(),  generateNewObject(),  generateNewObject(),  generateNewObject(), generateNewObject(), generateNewObject(),  generateNewObject(), generateNewObject(), generateNewObject(), generateNewObject()],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, generateNewObject(),  generateNewObject(),  generateNewObject(),  generateNewObject(),  generateNewObject(), generateNewObject(), generateNewObject(),  generateNewObject(), generateNewObject(), generateNewObject(), generateNewObject()],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, generateNewObject(),  generateNewObject(),  generateNewObject(),  generateNewObject(),  generateNewObject(), generateNewObject(), generateNewObject(),  generateNewObject(), generateNewObject(), generateNewObject(), generateNewObject()],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, generateNewObject(),  generateNewObject(),  generateNewObject(),  generateNewObject(),  generateNewObject(), generateNewObject(), generateNewObject(),  generateNewObject(), generateNewObject(), generateNewObject(), generateNewObject()],
  
  ]
  
  const [floors, setFloors] = useState<Floors>(initial);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isGameOver,setIsGameOver] = useState<boolean | null>(null)
  const [gameStats, setGameStats] = useState<{
    playerPosition: {
      prev: number[];
      current: number[];
    };
    score: number;
  }>(gameStatsInitial);
  const gameRef = React.useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (e:any) => {
   
    if (!isGameOver) {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          movePlayer(-1);
          break;
        case 'ArrowDown':
        case 's':
          movePlayer(1);
          break;
      }
    }
  };
  

  const movePlayer = ( dy: number) => {
    const [y,x] = gameStats.playerPosition.current
    const newY = y+dy
    if(newY <= floors.length){
      if (newY >= 0 && newY < floors.length) {
        setGameStats({ ...gameStats, playerPosition: {
          prev: [y,x],
          current:[newY, x]
          
        } });
      }
    } 
  };
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsGameOver((prev) => {
        if (prev === false) {
          setFloors((prev) =>
            prev.map((floor,indexFloor) => {
              const [_, ...rest] = floor;
              let newArr = [...rest, generateNewObject()]
              if(indexFloor === gameStats.playerPosition.current[0]){
                if( newArr[gameStats.playerPosition.current[1]] === 1){
                  const lsMaxScore = localStorage.getItem('maxScore')
               
                  if(gameStats.score >= Number(lsMaxScore) && lsMaxScore !== null){
                      localStorage.setItem('maxScore',`${gameStats.score}`)
                  }
                  setIsGameOver(true)
                 
                }
                newArr[gameStats.playerPosition.current[1]-1] =0
                newArr[gameStats.playerPosition.prev[1]-1] =2
                newArr[gameStats.playerPosition.current[1]]=2 
                return newArr;
              } else {
                 return newArr;
              }
            })
          );
          setGameStats({ ...gameStats, score: gameStats.score + 1 });
        } else {
          clearInterval(intervalRef.current!);
        }
        return prev;
      });
    }, 40);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [ gameStats]);
  return (
   <div   ref={gameRef}>
     {isGameOver === true ? <div className='gameover-block'>
         <span className='gameover-block__title'>ИГРА ОКОНЧЕНА</span>
         <span className='gameover-block__score'>  Текущий счёт: {gameStats.score} </span>
         {localStorage.getItem('maxScore') !== null &&  <span className='gameover-block__score'> Рекорд: {localStorage.getItem('maxScore')} </span>}
       
        <button className='button gameover-block__button' onClick={()=>{
          if(localStorage.getItem('maxScore') === null){
            localStorage.setItem('maxScore',gameStats.score+"")
          }
          setIsGameOver(false)
          setGameStats(gameStatsInitial)
          setFloors(initial)
        }}>начать заново</button>
      </div> 
      :<div  className='game-container'  tabIndex={0} >
          {isGameOver !== null ? <>
            <span className='score'>{gameStats.score}</span>
            <Game floors={floors}/></>: <button className='button' onClick={()=>{
               setGameStats(
                {playerPosition: {
                  prev: [4, 5],
                  current: [4, 5],
                },
                score: -1,
                })
               setIsGameOver(false)}}>Начать игру</button>}
          <WordsActionsList title='Управление'/>
      </div>}
   </div>
   
  );
};

export default App;