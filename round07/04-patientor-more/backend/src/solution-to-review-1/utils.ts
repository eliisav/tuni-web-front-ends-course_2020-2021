
// utils

/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatientEntry, Gender, Entry } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringProperty = (object: any, property: string): string => {
  if (!object[property] || !isString(object[property])) {
    throw new Error(`Incorrect or missing ${property}`);
  }
  return object[property];
}


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

const parseEntry = (entry: any): Entry => {
  if (!(entry.type == 'Hospital' ||
        entry.type == 'OccupationalHealthcare' ||
        entry.type == 'HealthCheck')) {
    throw new Error('Incorrect entry type: ' + entry.type)
  }

  return entry
}

const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    "name": parseStringProperty(object, 'name'),
    "dateOfBirth": parseDate(object['dateOfBirth']),
    "ssn": parseStringProperty(object, 'ssn'),
    "gender": parseGender(object['gender']),
    "occupation": parseStringProperty(object, 'occupation'),
    "entries": object['entries'].map((entry: any) => parseEntry(entry))
  }

  return newEntry;
}

export default toNewPatientEntry;