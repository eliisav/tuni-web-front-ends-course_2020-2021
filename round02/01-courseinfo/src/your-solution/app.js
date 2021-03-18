
// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = 'commit-sha-in-here';
// ------------------------------------------------------------ //


const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return parts.map(part => <Part key={part.id} part={part} />)
}

const Total = (props) => {
  console.log(props)
  let total = 0
  props.parts.forEach(part => {
    total += part.exercises
  })
  return (
    <p>Number of exercises {total}</p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )

}
