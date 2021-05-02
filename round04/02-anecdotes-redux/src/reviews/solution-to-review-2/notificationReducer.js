
const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export default notificationReducer;

export const notificationAction = (message) => {
  return {
    type: 'NOTIFY',
    payload: message
  }
}

export const clearNotificationAction = (message) => {
  return {
    type: 'CLEAR'
  }
}
