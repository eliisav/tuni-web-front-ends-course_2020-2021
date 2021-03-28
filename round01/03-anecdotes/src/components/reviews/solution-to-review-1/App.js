
import { useState } from 'react'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '1ca2c5f';
// ------------------------------------------------------------ //



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const points = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  
  
  const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
	)
	
	const IncrGood = () => () => {
		setSelected(Math.floor(Math.random() * Math.floor(6)));
	}
	
	const Vote = () => () => {
		points[selected] += 1
	}
	
	const Biggest = () => () => {
		var i = -1;
		var biggest = points[0];
		var pointer = 0;
		points.forEach(value => {
			i++;
			if (value > biggest) {
				biggest = value;
				pointer = i;
			}
		}) 
		
		return (
		<div>
		anecdotes[pointer]
		has {points[pointer]} votes
		</div>
		)
	} 

  return (
    <div>
	<h1>Anecdote of the day</h1>
      {anecdotes[selected]}
	  has {points[selected]} votes
	  <Button handleClick={() => Vote()} text="vote" />
	  <Button handleClick={() => IncrGood()} text="next anecdote" />
	  
	  <h1>Anecdote with most votes</h1>
	  <Biggest />
    </div>
  )
}

export default App