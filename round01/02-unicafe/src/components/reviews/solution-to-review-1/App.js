
import { useState } from 'react';

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '30ee03999073be56c00029165502e9ffd0f1b3e1';
// ------------------------------------------------------------ //

const Button = ({ label, onClickHandler }) => {
  return (
    <button onClick={() => onClickHandler(label)}>{label}</button>
  )
} 

const Feedback = ({ onClickHandler }) => {
  return (
    <>
      <h1>Give feedback</h1>
      <div>
        <Button label="good" onClickHandler={onClickHandler} />
        <Button label="neutral" onClickHandler={onClickHandler} />
        <Button label="bad" onClickHandler={onClickHandler} />
      </div>
    </>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Statistics = ( {good, bad, neutral}) => {
  const sum = good + bad + neutral
  const average = (good * 1 + bad * -1) / sum
  const positive = (good / sum) * 100
  
  if(sum === 0) {
    return <p>No feedback given</p>
  }
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={sum} />
          <StatisticsLine text="average" value={average.toFixed(2)} />
          <StatisticsLine text="positive" value={isNaN(positive) ? 0 : `${positive.toFixed(1)} %`} />
        </tbody>
      </table>
    </>
  )
}

export const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const buttonClick = (label) => {
    if (label === 'good') {
      setGood(good +1)
    } else if (label === 'bad') {
      setBad(bad + 1)
    } else {
      setNeutral(neutral + 1)
    }
  }

  return (
    <>
      <Feedback 
        onClickHandler={buttonClick}
      />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  )
}
