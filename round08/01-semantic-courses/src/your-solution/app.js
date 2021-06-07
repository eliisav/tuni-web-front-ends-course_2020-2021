
import { Course } from './components';
import courses from './courses-data';

// ** ENTER COMMIT SHA OF YOUR REPO IN HERE **
export const commitSHA = '-commit-sha-in-here-';

export const App = () => {

  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </>
  )
}
