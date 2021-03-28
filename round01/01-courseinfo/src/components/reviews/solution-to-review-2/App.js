import React from 'react'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = 'fac1f98';
// ------------------------------------------------------------ //



const Header = (props) => {
  return <h1>{props.course}</h1>
}
const Part = (props) => {
  return  <li>{props.name} {props.exercise}</li>
}
const Content = (props) =>  {
  console.info(props)
  const parts = props.parts.map(e => <Part key={e.part} name={e.name} exercise={e.exercises}/>)
  return (
    <ul>
      {parts}
    </ul>
  )
}
const Total = (props) => {
  const total = props.parts.map(e => e.exercises).reduce((acc,e) =>{
    return acc + e
  } )
  return <div>{total}</div>
}


export const App = () => {
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
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

