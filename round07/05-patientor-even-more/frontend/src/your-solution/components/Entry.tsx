
import React from "react";
import { Entry, HealthCheckRating } from '../types';
import { useStateValue } from "../state";
import { Icon, List } from "semantic-ui-react";


/* const BaseEntry = ({ entry }: { entry: Entry }) => {
  const [{diagnoses}] = useStateValue();

  return (
    <Table.Cell>
      <Table.Cell>
        <b>{entry.date}</b> {entry.type} {'employerName' in entry ? entry.employerName : null}
      </Table.Cell>
      <Table.Cell>{entry.description}</Table.Cell>
      <Table.Cell>
        <ul>
          {entry.diagnosisCodes?.map(code => 
            <li key={code}>{code} {diagnoses[code]?.name}</li>
          )}
        </ul>
      </Table.Cell>
    </Table.Cell>
  );
}; */

const DiagnosisList = ({ codes }: { codes: Array<string> | undefined}) => {
  const [{diagnoses}] = useStateValue();

  if (!codes) {
    return null;
  }

  return (
    <List.List as='ul'>
      {codes?.map(code => 
        <List.Item as='li' key={code}>{code} {diagnoses[code]?.name}</List.Item>
      )}
    </List.List>
  );
};

const iconColor = (rating: HealthCheckRating) => {
  switch (rating) {
    case 0:
      return 'green';
    case 1:
      return 'yellow';
    case 2:
      return 'brown';
    case 3:
      return 'black';
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry}> =({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <List.Item>
          <List.Header>
            {entry.date} <Icon name="hospital" size="big" />
          </List.Header>
          {entry.description}
          <DiagnosisList codes={entry.diagnosisCodes} />
          Discharge: {entry.discharge.date} {entry.discharge.criteria}
        </List.Item>
      );
    case "OccupationalHealthcare":
      return (
        <List.Item>
          <List.Header>
            {entry.date} <Icon name="stethoscope" size="big" />
            {entry.employerName}
          </List.Header>
          {entry.description}
          <DiagnosisList codes={entry.diagnosisCodes} />
          {entry.sickLeave ? 'Sick leave: ' : null}
          {entry.sickLeave?.startDate} {entry.sickLeave?.endDate}
        </List.Item>
      );
    case "HealthCheck":
      return (
        <List.Item>
          <List.Header>
            <b>{entry.date}</b> <Icon name="doctor" size="big" />
          </List.Header>
          {entry.description}
          <DiagnosisList codes={entry.diagnosisCodes} />
          <Icon name="heart" color={iconColor(entry.healthCheckRating)} />
        </List.Item>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
