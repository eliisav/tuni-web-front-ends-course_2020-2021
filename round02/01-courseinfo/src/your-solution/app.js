import Course from './components'
import courses from './courses-data'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = 'commit-sha-in-here';
// ------------------------------------------------------------ //


export const App = () => {
  const content = courses.map(course => <Course key={course.id} course={course} />)
  return (
    <div>
      <h1>Web development curriculum</h1>
      {content}
    </div>
  )
}
