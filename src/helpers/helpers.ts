import { FloorType } from "../types/IFloor";

export const generateNewObject = (): FloorType => { 
  const randomValue = Math.random();
  console.log(randomValue);
  
  if (randomValue < 0) {
    return 4; // 1% шанс
  } else if (randomValue < 0) {
    return 3; // 2% шанс
  } else if (randomValue < 0.06) {
    return 1; // 3% шанс
  } else {
    return 0; // 94% шанс
  }
}
