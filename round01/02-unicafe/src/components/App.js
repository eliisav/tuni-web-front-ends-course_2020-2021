
import { useState } from 'react';

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = 'f43e5ed';
// ------------------------------------------------------------ //

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

const Header = ({text}) => <h1>{text}</h1>

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad, all}) => {
  if (all === 0) {
    return (
      <div>
        <Header text='statistics' />
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <Header text='statistics' />
      <table>
        <tbody>
          <StatisticLine text='good' value={good}/>
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='bad' value={bad}/>
          <StatisticLine text='all' value={all}/>
          <StatisticLine text='average' value={(-1*bad + good) / all} />
          <StatisticLine text='positive' value={(good / all * 100).toString() + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

export const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const handleRatingClick = (rating, setRating) => () => {
    setAll(allClicks + 1)
    setRating(rating + 1)
  }

  return (
    <div>
      <Header text='give feedback' />
      
      <Button handleClick={handleRatingClick(good, setGood)}
        text='good'
      />
      <Button handleClick={handleRatingClick(neutral, setNeutral)}
        text='neutral'
      />
      <Button handleClick={handleRatingClick(bad, setBad)}
        text='bad'
      />

      <Statistics good={good} neutral={neutral} bad={bad} all={allClicks} />
    </div>
  )
}
