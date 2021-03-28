import React from 'react'
import ReactDOM from 'react-dom'

// ------------------------------------------------ ------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE //
// ------------------------------------------------ ------------ //
export const commitSHA = '54c5feb';
// ------------------------------------------------ ------------ //



export const App = () => {

  const Header = ({course}) => {

    return (
      <h1> {course.name} </h1>
    )

  }

  const Content = ({parts}) => {
    return (
      parts.map ((part, index) => <Part name = {part.name} exercises = {part.exercises} key = {index} />)
    )
  }

  const Total = ({parts}) => {
    const total = parts.reduce ((sum, part) => sum + part.exercises, 0);
    return (

      <p> Number of exercises {total} </p>
    )

  }

  const Part = ({name, exercises}) => {
    return (
      <p>
      {name} {exercises}
      </p>
    )


  }

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
    <Header course = {course} />
    <Content parts = {course.parts} />
    <Total parts = {course.parts} />
    </div>
  )
}

ReactDOM.render (<App />, document.getElementById ('root'))

