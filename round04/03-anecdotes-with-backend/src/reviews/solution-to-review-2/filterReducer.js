const initialState = null

export const actions = {
  SET_FILTER: 'SET_FILTER'
}

export const setFilter = (filter) => ({
  type: actions.SET_FILTER,
  payload: filter
})

const filterReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch(type) {
    case actions.SET_FILTER:
      return payload
    default:
      return state
  }
}

export default filterReducer
