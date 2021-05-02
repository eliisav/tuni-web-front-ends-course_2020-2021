import anecdoteService from "./anecdoteService";

export const voteActionCreator = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote)
    dispatch({
        type: "VOTE",
        data: { id: updatedAnecdote.id }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    let anecdotes = await anecdoteService.getAll()
    anecdotes = anecdotes.sort((a, b) => b.votes - a.votes);
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data;
    case "VOTE":
      return [...state].sort((a, b) => b.votes - a.votes);

    default:
      return state;
  }
};

export default reducer;
