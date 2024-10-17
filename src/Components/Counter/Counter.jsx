import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Notification from "../Notification/Notification";
import "react-circular-progressbar/dist/styles.css";
import { Footprints, Flame, Map } from "lucide-react";
import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import "./Counter.css";

function Counter() {
  const [steps, setSteps] = useState(0);
  const [fall, setFall] = useState(0);

  const goalSteps = 10000;
  const percentage = ((steps / goalSteps) * 100).toFixed(1); // Percentage to 1 decimal place
  const calories = Math.round(steps * 0.04); // 0.04 calories per step
  const distance = (steps * 0.000762).toFixed(2); // 0.000762 km per step

  useEffect(() => {
    // Reference for step count
    const stepsRef = ref(db, "Step_Count");
    const unsubscribeSteps = onValue(stepsRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data.int);
      setSteps(data.int); // Safeguard in case data is null
    });

    // Reference for fall detection
    const fallRef = ref(db, "Fall_detection");
    const unsubscribeFall = onValue(fallRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data.int);
      setFall(data.int); // Safeguard in case data is null
    });

    // Cleanup subscriptions when the component unmounts
    return () => {
      unsubscribeSteps();
      unsubscribeFall();
    };
  }, []);

  return (
    <>
      <div className="progress-bar-container">
        <CircularProgressbar
          value={percentage}
          text={`${steps.toLocaleString()}`}
          styles={buildStyles({
            textSize: "16px",
            pathColor: `rgba(62, 152, 199, ${steps / 100})`,
            textColor: "#3e98c7",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
        />
      </div>

      <div className="percentage-text">{percentage}% of daily goal</div>

      <div className="stats-grid">
        <div className="stat-item">
          <Footprints className="icon footprints-icon" />
          <div className="stat-value">{steps.toLocaleString()}</div>
          <div className="stat-label">Steps</div>
        </div>
        <div className="stat-item">
          <Flame className="icon flame-icon" />
          <div className="stat-value">{calories}</div>
          <div className="stat-label">Calories</div>
        </div>
        <div className="stat-item">
          <Map className="icon map-icon" />
          <div className="stat-value">{distance}</div>
          <div className="stat-label">Km</div>
        </div>
      </div>

      {fall === 1 && <Notification message="Fall detected!" />}
    </>
  );
}

export default Counter;
