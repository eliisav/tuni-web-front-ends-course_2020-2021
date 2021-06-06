
import { v4 as uuidv4 } from 'uuid';
import patientData from './data-patients';

import {
  NonSensitivePatientEntry,
  NewPatientEntry,
  Patient as PatientEntry,
  Entry,
  NewEntry
} from './types';

import toNewPatientEntry from './utils';

const patients: Array<PatientEntry> = patientData.map(obj => {
  const object = toNewPatientEntry(obj) as PatientEntry;
  object.id = obj.id;
  return object;
});

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    { id, name, dateOfBirth, gender, occupation }
  ));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = { id: uuidv4(), ...entry };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatient = (id: string): PatientEntry | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addEntryToPatient = (patient: PatientEntry, newEntry: NewEntry): Entry => {
  const entry = { id: uuidv4(), ...newEntry };
  patient.entries.push(entry);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  getPatient,
  addEntryToPatient
};
