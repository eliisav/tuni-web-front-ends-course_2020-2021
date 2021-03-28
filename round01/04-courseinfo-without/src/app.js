
'use strict';

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
const commitSHA = '4b6b84b';   //
// ------------------------------------------------------------ //

const Header = props => {
  return createElement(
    'h1', null, props
  )
};

const Part = props => {
  return createElement(
    'p', null, props.name, ' ', props.exercises
  )
};

const Content = props => {
  // Create an array of Part components
  const parts = props.map(part => Part(part))
  return createElement(
    'div', null, ...parts
  )
};

const Total = props => {
  let total = 0
  props.forEach(part => {
    total += part.exercises
  })
  return createElement(
    'p', null, 'Number of exercises ', total
  )
};

const App = ({ course }) => {
  return createElement(
    'div',
    null,
    Header(course.name),
    Content(course.parts),
    Total(course.parts)
  )  
};
