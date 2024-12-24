import React from 'react';
import cls from './FloorBlock.module.scss';

export const FloorBlock = ({ int }: { int: number }) => {
  let backgroundColor;

  switch (int) {
    case 0:
      // backgroundColor = "#fff";
      backgroundColor = "#fff";
      break;
    case 1:
      // backgroundColor = "#222";
      backgroundColor = "#222";
      break;
    case 2:
      // backgroundColor = "#ffdc00";
      backgroundColor = "#ffdc00";
      break;
    case 4:
      // backgroundColor = "blue";
      backgroundColor = "blue";
      break;
    case 3:
      // backgroundColor = "red";
      backgroundColor = "red";
      break;
    default:
      backgroundColor = undefined; // или можно оставить без значения
  }

  return (
    <div
      className={`${cls.floorBlock} ${backgroundColor}`}
      style={{ backgroundColor }}
    ></div>
  );
};
