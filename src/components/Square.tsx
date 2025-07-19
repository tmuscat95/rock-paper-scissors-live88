import React from 'react'
import classes from '../styles/game.module.scss';
type Props = {}

//@ts-ignore
export enum SquareType {
  rock = 'rock',
  paper = 'paper',
  scissors = 'scissors',
}

const Square = ({type}: {type: SquareType}) => {
  
  return (
    <div className={`${classes.square} ${classes[type]}`}>{type.toUpperCase()}</div>
  )
}

export default Square