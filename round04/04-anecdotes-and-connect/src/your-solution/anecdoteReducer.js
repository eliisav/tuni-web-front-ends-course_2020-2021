import anecdoteService from './services'

const anecdoteReducer = (state = [], action) => {
  //console.log('anecdote state now: ', state)
  //console.log('anecdote action', action)

  switch (action.type) {
    case 'INIT':
      return action.data
    case 'VOTE':
      const voted = action.data
      return state.map(anecdote =>
        anecdote.id !== voted.id ? anecdote : voted)
    case 'NEW':
      return [...state, action.data]
    default: return state
  }

}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export default anecdoteReducer
