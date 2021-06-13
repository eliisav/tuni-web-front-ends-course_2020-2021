import React from 'react';
import { Course } from './components';
import courses from './courses-data';
import 'semantic-ui-css/semantic.min.css';
import { Container, Divider, Header } from 'semantic-ui-react';


// ** ENTER COMMIT SHA OF YOUR REPO IN HERE **
export const commitSHA = '24df09b';

export const App = () => {

  return (
    <Container text textAlign='center'>

      <Divider hidden />

      <Header as='h1' color='grey'>Web development curriculum</Header>

      <Divider />

      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}

    </Container>
  )
}
