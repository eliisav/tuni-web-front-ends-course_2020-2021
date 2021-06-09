import React from "react";
import { Icon, Card } from "semantic-ui-react";
import { Entry } from "../types";
import { useStateValue } from "../state";
import { assertNever } from "../utils";

const EntryDetail = ({ entry }: { entry: Entry }) => {
	const [{ diagnosis }] = useStateValue();

	const getInfo = (entry: Entry) => {
		switch (entry.type) {
			case "HealthCheck":
				return <Icon name="doctor"></Icon>;
			case "Hospital":
				return <Icon name="hospital"></Icon>;
			case "OccupationalHealthcare":
				return (
					<>
						<Icon name="stethoscope"></Icon> {entry.employerName}
					</>
				);
			default:
				return assertNever(entry);
		}
	};

	return (
		<Card fluid>
			<Card.Content>
				<Card.Header>
					{entry.date} {getInfo(entry)}
				</Card.Header>
				<Card.Description>{entry.description}</Card.Description>
				{entry.diagnosisCodes && (
					<Card.Description>
						<h3>Diagnose</h3>
						<ul>
							{entry.diagnosisCodes.map((code) => (
								<li key={code}>
									{diagnosis[code].code} - {diagnosis[code].name}
								</li>
							))}
						</ul>
					</Card.Description>
				)}
				{entry.type === "HealthCheck" && (
					<Card.Meta>
						{" "}
						<Icon
							name="heart"
							style={{
								color:
									entry.healthCheckRating === 0
										? "green"
										: entry.healthCheckRating === 1
										? "orange"
										: "red",
							}}
						></Icon>{" "}
					</Card.Meta>
				)}
			</Card.Content>
		</Card>
	);
};

export default EntryDetail;
