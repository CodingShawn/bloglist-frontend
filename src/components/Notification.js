import React from "react";

function Notification({ text, error }) {
  if (text === null) {
    return null;
  }

  let color = error ? "red" : "green";
  let style = {
    color: color,
    fontWeight: 700,
    border: `2px solid ${color}`,
    borderRadius: "5px",
    background: "#ddd",
    padding: "5px",
  };

  return <div className="notification" style={style}>{text}</div>;
}

export default Notification;
