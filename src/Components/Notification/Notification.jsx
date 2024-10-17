import React, { useState } from "react";
import { getDatabase, ref, update, set } from "firebase/database";
import "./Notification.css";
import { db } from "../../firebase";

export default function Notification({ message }) {
  const [isOpen, setIsOpen] = useState(true);
  const [timestamp] = useState(new Date().toLocaleString());

  const handleClose = async () => {
    setIsOpen(false);

    // Update fall detection in Firebase to reset to 0

    const fallRef = ref(db, "Fall_detection");
    set(fallRef, { int: 0 })
      .then(() => {
        console.log("Fall detection reset to 0 in Firebase");
      })
      .catch((error) => {
        console.error("Error resetting fall detection:", error);
      });
  };
  const handleEmergencyServices = () => {
    console.log("Contacting emergency services...");
    // contact service number
    handleClose();
  };

  return (
    <div className={`dialog ${isOpen ? "open" : ""}`}>
      <div className="dialog-content">
        <div className="dialog-header">
          <div className="dialog-title">
            <span className="alert-icon">⚠️</span>
            {message}
          </div>
          <p className="dialog-description">
            A person has fallen and may need assistance.
          </p>
        </div>
        <div className="dialog-body">
          <p className="timestamp">Detected at: {timestamp}</p>
          <p className="check-message">
            Please check on the person immediately.
          </p>
        </div>
        <div className="dialog-footer">
          <button
            className="button destructive"
            onClick={handleEmergencyServices}
          >
            Contact Emergency Services
          </button>
          <button className="button outline" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
