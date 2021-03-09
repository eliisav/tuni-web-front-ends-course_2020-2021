
'use strict';

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
const commitSHA = 'commit-sha-in-here';   //
// ------------------------------------------------------------ //

const Header = props => {
    console.log(props)
    return React.createElement(
        'h1', null, props
    )
};

const Part = props => {
    console.log(props)
    return React.createElement(
      'p', null, props.name, ' ', props.exercises
    )
};

const Content = props => {
    console.log(props)
    const parts = props.map(part => Part(part))
    return React.createElement(
        'div', null, ...parts
    )
};

const Total = props => {
    console.log(props)
    let total = 0
    props.forEach(part => {
      total += part.exercises
    })
    return React.createElement(
      'p', null, 'Number of exercises ', total
    )
};

const App = ({ course }) => {
    return React.createElement(
        'div',
        null,
        Header(course.name),
        Content(course.parts),
        Total(course.parts)
    )  
};
