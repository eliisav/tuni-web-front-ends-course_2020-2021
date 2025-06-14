const initialState = ''

const filterReducer = (state = initialState, action) => {
  //console.log('filter state now: ', state)
  //console.log('filter action', action)

  switch (action.type) {
    case 'SET_FILTER':
      return action.data.text
    default: return state
  }

}

export const setFilter = (text) => {
  return {
    type: 'SET_FILTER',
    data: { text }
  }
}

export default filterReducer
