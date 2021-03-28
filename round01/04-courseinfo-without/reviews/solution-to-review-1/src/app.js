
'use strict';


// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
const commitSHA = '731461f';   //
// ------------------------------------------------------------ //

const  e =  React.createElement;

const Header = props => {
  return e('h1', null, props.courseName);
}

const Part = props => {
    return (
        e('p', null, props.part1 + " " + props.exercises1),
        e('p', null, props.part2 + " " + props.exercises2),
        e('p', null, props.part3 + " " + props.exercises3)
    )
}

const Content = props => {
    return(
        e('div', null, 
            e(Part, {part1 : props.part1, exercises1 : props.exercises1}, null),
            e(Part, {part2 : props.part2, exercises2 : props.exercises2}, null),
            e(Part, {part3 : props.part3, exercises3 : props.exercises3}, null)
        )
    )
}

const Total = props => {
    return(
        e('p', null, props.totalExercises)
    )
}

const App = ({ course }) => {
    const totalExercises = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises;
    return (
        e(
            'div',
            null,
            e(
                Header, {courseName: course.name}, null, 
            ),
            e(
                Content, {part1 : course.parts[0].name, exercises1 : course.parts[0].exercises,
                    part2 : course.parts[1].name, exercises2 : course.parts[1].exercises,
                    part3 : course.parts[2].name, exercises3 : course.parts[2].exercises }, null
            ),
            e(
                Total, {totalExercises : totalExercises}, null
            )
        )
    )
}
