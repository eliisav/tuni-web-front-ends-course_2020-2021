
const CourseHeader = ({ course }) =>
  <h2>
    {course}
  </h2>


const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} part={part} />)
      }
    </>
  )
}


const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>


const Total = ({ parts }) => {
  const total = parts.reduce((acc, cur) => acc + cur.exercises, 0)
  return (
    <p>
      total of {total} exercises
    </p>
  )
}

export const Course = ({ course }) => {
  return (
    <>
      <CourseHeader course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}
      />
    </>
  )
}

