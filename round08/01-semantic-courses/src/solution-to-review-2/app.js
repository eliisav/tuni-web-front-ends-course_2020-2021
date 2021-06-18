import { Course } from './components';
import { Header } from 'semantic-ui-react'
import courses from './courses-data';

// ** ENTER COMMIT SHA OF YOUR REPO IN HERE **
export const commitSHA = '1376674';

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export const App = () => {

  return (
    <>
      <Header as ='h1' textAlign="center">Web development curriculum</Header>
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </>
  )
}
