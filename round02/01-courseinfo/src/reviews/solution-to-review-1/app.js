import {Course} from './components';
import {courses} from './courses-data';
// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '67624d2';
// ------------------------------------------------------------ //






export const App = () => {
  return (
    courses.map((course, index) => <Course key={index} course={course} />)

  )
}
