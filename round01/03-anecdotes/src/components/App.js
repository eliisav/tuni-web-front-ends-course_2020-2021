
import { useState } from 'react'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = 'commit-sha-in-here';
// ------------------------------------------------------------ //

const Header = ({text}) => <h1>{text}</h1>

const Anecdote = ({anecdote, votes}) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

export const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
    new Array(anecdotes.length).fill(0)
  )

  const selectAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVoteClick = () => {
    const copiedVotes = [...votes]
    copiedVotes[selected] += 1
    setVotes(copiedVotes)
  }

  // Returns the index of the first occurrence of anecdotes with most votes
  const mostVotes = () => votes.indexOf(Math.max(...votes))

  console.log(selected)
  console.log(votes)
  
  return (
    <div>
      <Header text='Anecdote of the day' />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={selectAnecdote} text='next anecdote' />
      <Header text='Anecdote with most votes' />
      <Anecdote anecdote={anecdotes[mostVotes()]} votes={votes[mostVotes()]} />
    </div>
  )
}
