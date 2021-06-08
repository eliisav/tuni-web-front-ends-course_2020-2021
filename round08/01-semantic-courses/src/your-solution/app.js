import React from 'react';
import { Course } from './components';
import courses from './courses-data';
import 'semantic-ui-css/semantic.min.css';
import { Container, Divider, Header, Segment } from 'semantic-ui-react';


// ** ENTER COMMIT SHA OF YOUR REPO IN HERE **
export const commitSHA = '-commit-sha-in-here-';

export const App = () => {

  return (
    <Container textAlign='center'>

      <Segment padded='very'>
        <Header as='h1' color='grey'>Web development curriculum</Header>
      </Segment>

      <Divider />

      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}

    </Container>
  )
}
