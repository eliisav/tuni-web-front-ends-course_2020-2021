
// utils

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  NewPatientEntry,
  Gender,
  NewEntry,
  //SickLeave,
  //Discharge
} from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringProperty = (object: any, property: string): string => {
  if (!object[property] || !isString(object[property])) {
    throw new Error(`Incorrect or missing ${property}`);
  }
  return object[property];
};


const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  } 
  return gender;
};


const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};


const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    "name": parseStringProperty(object, 'name'),
    "dateOfBirth": parseDate(object['dateOfBirth']),
    "ssn": parseStringProperty(object, 'ssn'),
    "gender": parseGender(object['gender']),
    "occupation": parseStringProperty(object, 'occupation'),
    "entries": object.entries ? object.entries : []
  };

  return newEntry;
};

export const toNewEntry = (object: any): NewEntry | undefined => {
  const baseEntry = {
    "date": parseDate(object['date']),
    "specialist": parseStringProperty(object, 'specialist'),
    "description": parseStringProperty(object, 'description'),
    "diagnosisCodes": object.diagnosisCodes,
    "type": object.type,
  };

  let newEntry;

  if (object.type === "HealthCheck") {
    newEntry = {
      ...baseEntry,
      "healthCheckRating": object.healthCheckRating
    };

  } else if (object.type === "OccupationalHealthcare") {
    newEntry = {
      ...baseEntry,
      "employerName": parseStringProperty(object, 'employerName'),
      "sickLeave": object.sickLeave
    };

  } else if (object.type === "Hospital") {
    newEntry = {
      ...baseEntry,
      "discharge": object.discharge
    };
  }

  return newEntry;
};

export default toNewPatientEntry;
