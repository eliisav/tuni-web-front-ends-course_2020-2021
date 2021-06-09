import React from "react";
import { CoursePart } from "./course-data";

export const Header = ({ name }: { name: string }) => {
	return <h1>{name}</h1>;
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const Part = (props: CoursePart) => {
	switch (props.type) {
		case "normal":
			return (
				<div>
					<strong>
						{props.name} {props.exerciseCount}
					</strong>
          <br />
					<em>{props.description}</em>
          <br />
          <br />
				</div>
			);
		case "groupProject":
			return (
				<div>
					<strong>
						{props.name} {props.exerciseCount}
					</strong>
          <br />
					project exercises {props.groupProjectCount}
          <br />
          <br />
				</div>
			);
		case "submission":
			return (
				<div>
					<strong>
						{props.name} {props.exerciseCount}
					</strong>
          <br />
					<em>{props.description}</em>
					<br />
					submit to {props.exerciseSubmissionLink}
          <br />
          <br />
				</div>
			);
		case "special":
			return (
				<div>
					<strong>
						{props.name} {props.exerciseCount}
					</strong>
          <br />
					<em>{props.description}</em>
					<br />
					required skills: {props.requirements.join(", ")}
          <br />
          <br />
				</div>
			);
		default:
			return assertNever(props);
	}
};

export const Content = ({
	courseParts,
}: {
	courseParts: Array<CoursePart>;
}) => {
	return (
		<div>
			{courseParts.map((part) => (
				<Part key={part.name} {...part} />
			))}
		</div>
	);
};

export const Total = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
	const total = courseParts.reduce(
		(carry, part) => carry + part.exerciseCount,
		0
	);
	return <div>Number of exercises : {total}</div>;
};
