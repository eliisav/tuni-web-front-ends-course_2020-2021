const initialState = {
  message: null,
  timeoutToken: null
}

export const actions = {
  SET_NOTIFICATION: 'SET_NOTIFICATION',
  CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION'
}

export const setNotification = (message, timeout = 5) => {
  return async dispatch => {
    dispatch({
      type: actions.SET_NOTIFICATION,
      payload: {
        message,
        timeoutToken: setTimeout(
          () => dispatch(clearNotification())
          , timeout * 1000)
      }
    })
  }
}

export const clearNotification = () => ({
  type: actions.CLEAR_NOTIFICATION
})

const notificationReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch(type) {
    case actions.SET_NOTIFICATION:
      if(state.timeoutToken)
        clearTimeout(state.timeoutToken)

      return payload
    case actions.CLEAR_NOTIFICATION:
      return initialState
    default:
      return state
  }
}

export default notificationReducer
