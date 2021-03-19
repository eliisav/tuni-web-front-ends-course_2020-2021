import React from 'react'

const Header = ({text}) => {
  return (
    <h2>{text}</h2>
  )
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return parts.map(part => <Part key={part.id} part={part} />)
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <h3>total of {total} exercises </h3>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course