import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../reducers/notificationReducer";

function Notification() {
  const notification = useSelector((state) => state.notifications);
  let { text, error } = notification;
  const dispatch = useDispatch();

  function timer() {
    return setTimeout(() => dispatch(clearNotification()), 5000);
  }

  useEffect(() => {
    let removeTimer = timer();
    return () => clearTimeout(removeTimer);
  }, [notification]);

  if (text === "") {
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

  return (
    <div className="notification" style={style}>
      {text}
    </div>
  );
}

export default Notification;
