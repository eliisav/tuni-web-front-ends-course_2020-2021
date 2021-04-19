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

export const setMessage = (msg) => {
  return {
    type: 'SET_MSG',
    data: { msg }
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR_MSG'
  }
}

export default notificationReducer
