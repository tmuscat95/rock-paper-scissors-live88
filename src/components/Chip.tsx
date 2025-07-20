import classes from "../styles/chip.module.scss";
import type Decimal from "decimal.js";

const Chip = ({ bet }: { bet: Decimal }) => {
  return (
    <>
      {bet && bet.gt(0) && <div className={classes.chip}>{bet.toString()}</div>}
    </>
  );
};

export default Chip;
