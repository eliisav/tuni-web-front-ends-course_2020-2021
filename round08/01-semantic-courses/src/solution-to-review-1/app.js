
import { Course } from './components';
import courses from './courses-data';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header, Divider } from 'semantic-ui-react'

// ** ENTER COMMIT SHA OF YOUR REPO IN HERE **
export const commitSHA = 'ae79856';

export const App = () => {

  return (
    <Container>
      <Divider hidden />
      <Header as='h1' textAlign='center' color='grey'>Web development curriculum</Header>
      <Divider/>
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </Container>
  )
}
