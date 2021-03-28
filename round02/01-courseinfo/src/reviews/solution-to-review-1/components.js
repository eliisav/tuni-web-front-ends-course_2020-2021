export const Course = ({ course }) => {

    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
  
    )
  }
  
  
  const Header = ({ course }) => {
  
    return (
      <h1>{course.name}</h1>
    )
  
  }
  
  const Content = ({ parts }) => {
    return (
      parts.map((part, index) => <Part name={part.name} exercises={part.exercises} key={index} />)
    )
  }
  
  const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
  
      <p><b>Total of {total} exerrcises</b></p>
    )
  
  }
  
  const Part = ({ name, exercises }) => {
    return (
      <p>
        {name} {exercises}
      </p>
    )
  
  
  }