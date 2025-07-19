import classes from '../styles/Game.module.scss';
import Play from './Play';
import Messages from './Messages';
import Squares from './Square';
import Statusbar from './Statusbar';


const Game = () => {

  return (
    <>
      <div className={classes.game}>
        <Statusbar />
        <Messages/>
        <Squares/>
        <Play />
      </div>
    </>
  )
}

export default Game