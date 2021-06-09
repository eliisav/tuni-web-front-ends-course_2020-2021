import React from 'react';

import { Header, Content, Total } from './components';
import {courseParts} from "./course-data"


// ** enter commit sha of your repository in here **
export const commitSHA = '99ffe08';

export const App = () => {
  const courseName = "Half Stack application development";
  // const courseParts = [
  //   {
  //     name: "Fundamentals",
  //     exerciseCount: 10
  //   },
  //   {
  //     name: "Using props to pass data",
  //     exerciseCount: 7
  //   },
  //   {
  //     name: "Deeper type usage",
  //     exerciseCount: 14
  //   }
  // ];

  // return (

  //   <div>
  //     <h1>{courseName}</h1>
  //     <p>
  //       {courseParts[0].name} {courseParts[0].exerciseCount}
  //     </p>
  //     <p>
  //       {courseParts[1].name} {courseParts[1].exerciseCount}
  //     </p>
  //     <p>
  //       {courseParts[2].name} {courseParts[2].exerciseCount}
  //     </p>
  //     <p>
  //       Number of exercises{" "}
  //       {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  //     </p>
  //   </div>
  // );

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )

};

