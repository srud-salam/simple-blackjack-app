import React from "react";
import styles from "../styles/Controls.module.css";

type ControlsProps = {
  buttonState: any,
  hitEvent: any,
  stickEvent: any,
  resetEvent: any
};

const Controls: React.FC<ControlsProps> = ({ buttonState, hitEvent, stickEvent, resetEvent }) => { 
     return (
       <div className={styles.controlsContainer}>
         <button onClick={() => hitEvent()} disabled={buttonState.hitDisabled} className={styles.button}>
           Hit
         </button>
         <button onClick={() => stickEvent()} disabled={buttonState.stickDisabled} className={styles.button}>
           Stick
         </button>
         <button onClick={() => resetEvent()} disabled={buttonState.resetDisabled} className={styles.button}>
           Reset
         </button>
       </div>
     );
}

export default Controls;