
import { v4 as uuidv4 } from 'uuid';
import patientData from './data-patients';

import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
  Patient
} from './types';

import toNewPatientEntry from './utils';

const patients: Array<Patient> = patientData.map(obj => {
  const object = toNewPatientEntry(obj) as Patient
  object.id = obj.id
  return object
});

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    { id, name, dateOfBirth, gender, occupation }
  ))
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = { id: uuidv4(), ...entry };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id) as Patient
  return patient
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  getPatient
};
