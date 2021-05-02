const initialState = {
  message: null,
  timeout: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      // Cancel previous notification hiding timeout
      clearTimeout(state.timeout)
      return action.data
    case 'HIDE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (message, seconds) => {
  return (dispatch) => {
    const timeout = setTimeout(
      () => dispatch({ type: 'HIDE_NOTIFICATION'}),
      seconds * 1000
    )
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        timeout
      }
    })
  }
}

export default reducer
