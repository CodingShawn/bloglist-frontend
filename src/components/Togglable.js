const { useState } = require("react");

function Togglable(props) {
  const [isVisible, setIsVisible] = useState(false);

  const showWhenVisible = {display: isVisible ? "" : "none"};
  const hideWhenVisible = {display: isVisible ? "none" : ""};

  function toggleVisibility() {
    setIsVisible(!isVisible);
  }

  return (
    <>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
    </>
  );
}

export default Togglable;