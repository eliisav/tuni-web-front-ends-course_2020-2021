const anecdotesAtStart = 
[
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const ACTION_TYPES = 
{
  VOTE: 'VOTE',
  ADD:  'ADD'
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => 
{
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const voteLike = (id) =>
{
  return {
    type: ACTION_TYPES.VOTE,
    data: { id }
  }
}

const _handleLike = (state, id) =>
{
  return state.map(
  (elem) =>
  {
    if(elem.id === id)
    {
      return { ...elem, votes: elem.votes + 1 }
    }
    return elem
  })
}

export const addAnecdote = (data) =>
{
  return {
    type: ACTION_TYPES.ADD,
    data: asObject(data)
  }
}

const _handleAddAnecdote = (state, anecdote) =>
{
  return state.concat(anecdote)
}

const reducer = (state = initialState, action) => 
{
  const { type = undefined, data = undefined } = action
  
  switch(type)
  {
    case ACTION_TYPES.VOTE:
      return _handleLike(state, data.id)
    
    case ACTION_TYPES.ADD:
      return _handleAddAnecdote(state, data)

    default:
      return state;
  }
}

export default reducer