import React from 'react';
import { Entry, DiagnoseEntry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const DiagnosisListing = ({diagnosisCodes}: {diagnosisCodes: Array<DiagnoseEntry['code']> | undefined}) => {
    const [{ diagnoseEntries }] = useStateValue();
    if (diagnosisCodes) {
        return (
            <ul>
                {diagnosisCodes.map((code: string) =>
                 <li key={code}>{code}: {diagnoseEntries[code].name}</li>)}
            </ul>
        );
    }

    return null;
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({entry}) => {
    return (
        <div>
          <h3>{entry.date}</h3>
          <DiagnosisListing diagnosisCodes={entry.diagnosisCodes}/>
          {entry.description}
          {entry.discharge.date}
          {entry.discharge.criteria}
        </div>
    );
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({entry}) => {
     return (
        <div>
          <h3>{entry.date}</h3>
          <DiagnosisListing diagnosisCodes={entry.diagnosisCodes}/>
          {entry.description}
          Rating: {entry.healthCheckRating}
        </div>
    ); 
};

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({entry}) => {
    return (
        <div>
          <h3>{entry.date}</h3>
          <DiagnosisListing diagnosisCodes={entry.diagnosisCodes}/>
          {entry.description}
          Employer: {entry.employerName}
        </div>
    ); 
};

export const EntryDetails: React.FC<{ entry: Entry }> = ({entry}) => {
  switch (entry.type) {
  case "Hospital":
      return <Hospital entry={entry}/>;
  case "HealthCheck":
      return <HealthCheck entry={entry}/>;
  case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry}/>;
  default:
    return assertNever(entry);
  }
};
