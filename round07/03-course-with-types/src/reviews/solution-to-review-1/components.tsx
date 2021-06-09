
import React from 'react';
import { CoursePart } from './course-data'

export const Header = ({name}: {name: string}): JSX.Element => {

  return (
    <h1>{name}</h1>
  );

};

type CourseParts = Array<CoursePart>

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({part}: {part: CoursePart}): JSX.Element => {
  switch(part.type){
    case "normal":
      return (<div>
        <p key={part.name}><b>{part.name} {part.exerciseCount}</b><br></br><cite>{part.description}</cite></p>
      </div>)
    case "groupProject":
      return (<div>
        <p key={part.name}><b>{part.name} {part.exerciseCount}</b><br></br>project exercises {part.groupProjectCount}</p>
        </div>)
    case "submission":
      return (<div>
        <p key={part.name}><b>{part.name} {part.exerciseCount}</b><br></br><cite>{part.description}</cite><br></br>submit to {part.exerciseSubmissionLink}</p>
      </div>)  
    case "special":
      return(<div>
        <p key={part.name}><b>{part.name} {part.exerciseCount}</b><br></br><cite>{part.description}</cite><br></br>required skills: {part.requirements.reduce((carry, p) => carry + p + ", ", "")}</p>
      </div>)
    default:
      return assertNever(part)
  }
};

export const Content = ({parts}: {parts: CourseParts}): JSX.Element => {
  return (<div>{parts.map(p => <Part key={p.name} part={p}/>)}</div>);
};

export const Total = ({parts}: {parts: CourseParts}): JSX.Element => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );

};
