
import { v4 as uuidv4 } from 'uuid';
import patientData from './data-patients';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from './types';
import toNewPatientEntry from './utils';

const patients: Array<PatientEntry> = patientData.map(obj => {
  const object = toNewPatientEntry(obj) as PatientEntry
  object.id = obj.id
  return object
});

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    { id, name, dateOfBirth, gender, occupation }
  ))
};
const getPatientEntryById = ( id: string ): PatientEntry | undefined => {
  const patientEntry = patients.find(patient => patient.id == id);
  return patientEntry;
}


const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = { id: uuidv4(), ...entry };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  getPatientEntryById
};
