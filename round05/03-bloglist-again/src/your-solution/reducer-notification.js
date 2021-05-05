
const notificationReducer = (state = null, action) => {
  //console.log('notification state now: ', state)
  //console.log('notification action', action)

  switch (action.type) {
    case 'SET_MSG':
      return action.data
    case 'CLEAR_MSG':
      return null
    default: return state
  }

}

export const setNotification = (msg) => {
  return {
    type: 'SET_MSG',
    data: msg
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_MSG'
  }
}

export default notificationReducer

