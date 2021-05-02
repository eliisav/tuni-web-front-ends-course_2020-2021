const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      const anecdotes = state.map((anecdote) => {
        // Leave as it is.
        if (anecdote.id !== action.data.id) {
          return anecdote
        }
        // Copy the object and increment votes.
        return {
          ...anecdote,
          votes: ++anecdote.votes
        }
      })
      // Copy the array, do not mutate. Sort by votes.
      return [...anecdotes].sort((a, b) => b.votes - a.votes)
    case 'NEW_ANECDOTE':
      const id = action.data.id
      const content = action.data.content
      const newAnecdotes = [...state]
      newAnecdotes.push({
        id,
        content,
        votes: 0
      })
      return newAnecdotes
    default:
      return state
  }
}

export const voteAction = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const newAnecdoteAction = (id, content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: { id, content }
  }
}

export default anecdoteReducer
