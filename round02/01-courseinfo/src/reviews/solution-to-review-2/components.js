const Header = props =>
  <h1>
    {props.course}
  </h1>


const Content = props => {
  const { parts } = props
  const partsList = parts.map(part =>
    <Part part={part} key={part.id} />
  )
  return (
    <div>
      {partsList}
    </div>
  )
}


const Part = props =>
  <p>
    {props.part.name} {props.part.exercises}
  </p>


const Total = props =>
  <p>
    <strong>Total of {props.total} exercises </strong>
  </p>



const Course = props => {
  const { course } = props
  const total = course.parts.reduce((acc, curr) => {
    return acc + curr.exercises
  }, 0)

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total}
      />
    </>
  )
}

export default Course