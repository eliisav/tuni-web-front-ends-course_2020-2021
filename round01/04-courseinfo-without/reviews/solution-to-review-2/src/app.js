
'use strict';

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
const commitSHA = '29038038f08c8c28dba8e107a71f1efc37d180c8';   //
// ------------------------------------------------------------ //

const Header = props => {
    return React.createElement(
        'h1',
        null,
        props.name
    )
}

const Part = props => {
    return React.createElement(
        'p',
        null,
        props.name,
        ' ',
        props.exercises
    )
}

const Content = props => {
    return React.createElement(
        'div',
        null,
        Part(props.parts[0]),
        Part(props.parts[1]),
        Part(props.parts[2])
    )
}

const Total = props => {
    return React.createElement(
        'p',
        null,
        'Number of exercises ',
        (props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises)
    )
}

const App = props => {
    return React.createElement(
        'div',
        null,
        Header(props.course),
        Content(props.course),
        Total(props.course)
    )
}
