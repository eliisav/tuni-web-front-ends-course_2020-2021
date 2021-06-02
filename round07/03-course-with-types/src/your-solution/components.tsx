
import React from 'react';
import { CoursePart } from './course-data'

export const Header = ({ name }: { name: string  }) => {

  return (
    <h1>{name}</h1>
  );

};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br/>
          <i>{part.description}</i>
        </p>
      )
    case "groupProject":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br/>
          project exercises {part.groupProjectCount}
        </p>
      )
    case "submission":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br/>
          <i>{part.description}</i>
          <br/>
          submit to {part.exerciseSubmissionLink}
        </p>
      )
      case "special":
        return (
          <p>
            <b>{part.name} {part.exerciseCount}</b>
            <br/>
            <i>{part.description}</i>
            <br/>
            required skils: {part.requirements.join(', ')}
          </p>
        )
    default:
      return assertNever(part);
  }
}

export const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {

  return (
    <div>
      {courseParts.map(part => <Part key={part.name} part={part} />)}
    </div>
  )

};



export const Total = ({ courseParts }: { courseParts: Array<CoursePart> }) => {

  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );

};
