import React from 'react';

import { Header, Content, Total } from './components';
import { courseParts } from './course-data'


// ** enter commit sha of your repository in here **
export const commitSHA = '180722e';

export const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );

};

