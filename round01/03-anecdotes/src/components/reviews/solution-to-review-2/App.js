
import { useState } from 'react'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '5a0f8e9';
// ------------------------------------------------------------ //

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const Button = ({text, eventHandler}) => <button onClick={eventHandler}>{text}</button>

const Quote = ({ text, vote }) => (
  <>
    <div>{text}</div>
    <div>has {vote} votes</div>
  </>
)

export const App = ({anecdotes}) => {

  const arr = Array(anecdotes.length).fill(0);
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(arr)

  const onNextButton = () => {
    const num = getRandomInt(anecdotes.length)
    setSelected(num); 
    console.log(num);
  }

  const onVoteButton = () => {
    const copy = [...vote];
    copy[selected] += 1
    setVote(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Quote text={anecdotes[selected]} vote={vote[selected]} />
      <Button text='vote' eventHandler={onVoteButton} />
      <Button text='next anecdote' eventHandler={onNextButton} />
      <h1>Anecdote with most votes</h1>
      {Math.max(...vote) !== 0 && 
      <Quote text={anecdotes[vote.indexOf(Math.max(...vote))]} vote={Math.max(...vote)}/>}      
    </div>
  )
}

