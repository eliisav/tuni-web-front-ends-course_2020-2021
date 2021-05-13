//käytetään notificationin asettamiseen
export const setNotification = (message, notificationType) => {
  if (window.notificationTimeout) {
    window.clearTimeout(window.notificationTimeout)
  }

  return async (dispatch) => {
    dispatch({ type: 'DISPLAY_NOTIFICATION', data: { message, notificationType } })

    window.notificationTimeout = setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
  }
}

const initialState = {
  message: null,
  notificationType: null,
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'DISPLAY_NOTIFICATION':
    return action.data
  case 'CLEAR_NOTIFICATION':
    return {
      message: null,
      notificationType: null,
    }

  default:
    return state
  }
}

export default notificationReducer