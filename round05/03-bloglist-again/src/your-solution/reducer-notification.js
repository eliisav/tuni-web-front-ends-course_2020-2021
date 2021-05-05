const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_MSG':
      return action.data
    case 'CLEAR_MSG':
      return null
    default: return state
  }

}

export const setNotification = (msg) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MSG',
      data:  msg
    })

    setTimeout(() => {
      dispatch({
        type: 'CLEAR_MSG'
      })
    }, msg && msg.error ? 5000 : 3000)
  }
}

export default notificationReducer

