/* eslint-disable indent */

const initialState = {
  text: "",
  error: false,
};

function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case "NEW-NOTIFICATION":
      return { text: action.text, error: action.error };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
}

export function createNotification(notificationMessage, isMessageError) {
  return {
    type: "NEW-NOTIFICATION",
    text: notificationMessage,
    error: isMessageError,
  };
}

export function clearNotification() {
  return {
    type: "CLEAR",
  };
}

export default notificationReducer;
