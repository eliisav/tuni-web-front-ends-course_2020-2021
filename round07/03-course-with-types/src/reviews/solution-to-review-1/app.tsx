import React from 'react';

import { Header, Content, Total } from './components';
import { courseParts } from './course-data'

// ** enter commit sha of your repository in here **
export const commitSHA = 'b27b908';

export const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );

};

