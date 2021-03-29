import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = React.forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  Togglable.displayName = "Togglable";

  const showWhenVisible = { display: isVisible ? "" : "none" };
  const hideWhenVisible = { display: isVisible ? "none" : "" };

  function toggleVisibility() {
    setIsVisible(!isVisible);
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };

  return (
    <>
      <div style={showWhenVisible} className="togglable-content">
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
    </>
  );
});

export default Togglable;
