
import { Course } from './components';
import courses from './courses-data';
import { Typography } from "@material-ui/core"
// ** ENTER COMMIT SHA OF YOUR REPO IN HERE **
export const commitSHA = '351b608';

export const App = () => {
  return (
    <>
      <Typography variant='h3'>Web development curriculum</Typography>
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </>
  )
}
