import anecdoteService from "./anecdoteService"

const initialState = []

export const actions = {
  UPDATE: 'UPDATE_ANECDOTE',
  NEW_ANECDOTE: 'NEW_ANECDOTE',
  INIT: 'INIT_ANECDOTES'
}

export const addAnecdote = (anecdote) => {
  return async dispatch => {
    const addedAnecdote = await anecdoteService.create(anecdote)
    dispatch({
      type: actions.NEW_ANECDOTE,
      payload: addedAnecdote
    })
  }
}

export const updateAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch({
      type: actions.UPDATE,
      payload: updatedAnecdote
    })
  }
}

export const initializeNotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: actions.INIT,
      payload: anecdotes
    })
  }
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch(type) {
    case actions.UPDATE:
      const newState = [ ...state ]
      const index = newState.findIndex(anecdote => anecdote.id === payload.id)

      newState.splice(index, 1, payload)
      newState.sort((a, b) => b.votes - a.votes)

      return newState
    case actions.NEW_ANECDOTE:
      return [ ...state, payload ]
    case actions.INIT:
      return payload
    default:
      return state;
  }
}

export default reducer
