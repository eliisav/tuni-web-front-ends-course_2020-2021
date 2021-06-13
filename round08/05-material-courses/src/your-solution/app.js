
import { Course } from './components';
import courses from './courses-data';

import { Box, Container, Divider, Typography} from '@material-ui/core';
import React from 'react';


// ** ENTER COMMIT SHA OF YOUR REPO IN HERE **
export const commitSHA = '-commit-sha-in-here-';

export const App = () => {

  return (
      <Container maxWidth="md">
        <Box my={4}>

          <Typography variant="h4" component="h1" align="center">
            Web development curriculum
          </Typography>

          <Divider />

          {courses.map(course =>
            <Course key={course.id} course={course} />
          )}
          
        </Box>
      </Container>
  )
}
