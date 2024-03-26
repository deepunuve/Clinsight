import React from "react";

export default function Loader() {
  return (
    <div className="spinner-container" style={{'margin-top':'10px'}}>
      <div className="loading-spinner"></div>
    </div>
  );
}