import classes from "../styles/statusbar.module.scss";
import { useGameplaySelector } from "../app/store";

const Statusbar = () => {
  const [balance, currentBetTotal, currentWinnings] = useGameplaySelector(
    (gp) => [gp.balance, gp.currentBetTotal, gp.currentWinnings],
  );
  return (
    <div className={classes.statusBar}>
      <div className={classes.balance}>
        <span className={classes.label}>Balance:</span>{" "}
        <span className={classes.text}>{balance}</span>
      </div>
      <div className={classes.currentBetTotal}>
        <span className={classes.label}>Bet:</span>{" "}
        <span className={classes.text}>{currentBetTotal}</span>
      </div>
      <div className={classes.totalWinnings}>
        <span className={classes.label}>Win:</span>{" "}
        <span className={classes.text}>{currentWinnings}</span>
      </div>
    </div>
  );
};

export default Statusbar;
