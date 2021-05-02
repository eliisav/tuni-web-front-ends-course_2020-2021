export const setNotificationMsg = (notificationMsg, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION_MSG",
      notificationMsg,
      seconds,
    });
  };
};

const initialState = "";

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION_MSG":
      return {
        notificationMsg: action.notificationMsg,
        seconds: action.seconds,
      };

    default:
      return state;
  }
};

export default notificationReducer;
