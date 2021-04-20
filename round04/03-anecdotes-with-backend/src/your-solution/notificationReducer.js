const initialState = ''

const notificationReducer = (state = initialState, action) => {
  //console.log('notification state now: ', state)
  //console.log('notification action', action)

  switch (action.type) {
    case 'SET_MSG':
      return action.data.msg
    case 'CLEAR_MSG':
      return initialState
    default: return state
  }

}

export const showMessage = (msg, time) => {
  return async dispatch => {
    await dispatch({type: 'SET_MSG', data: { msg }})

    setTimeout(() => {
      dispatch({
        type: 'CLEAR_MSG'
      })
    }, time*1000)
  }
}

export default notificationReducer
