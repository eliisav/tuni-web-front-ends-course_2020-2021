import Course from './components'
import {courses} from './courses-data'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '6790405';
// ------------------------------------------------------------ //

export const App = () => {
  return courses.map(course => <Course course={course} key={course.id} />)
}

