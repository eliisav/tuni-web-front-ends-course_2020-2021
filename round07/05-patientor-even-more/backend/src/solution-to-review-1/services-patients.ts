import { v4 as uuidv4 } from "uuid";
import patientsDatabase from "./data-patients";
import {assertNever} from "./utils";
import {
	PatientEntry,
	NonSensitivePatientEntry,
	NewPatientEntry,
	Patient,
	EntryWithoutId,
	Entry,
} from "./types";
import toNewPatientEntry from "./utils";

let patientsData = patientsDatabase;

const patients: Array<PatientEntry> = patientsData.map((obj) => {
	const object = toNewPatientEntry(obj) as PatientEntry;
	object.id = obj.id;
	return object;
});

const getEntries = (): Array<PatientEntry> => {
	return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
	const newPatientEntry = { id: uuidv4(), ...entry };
	patients.push(newPatientEntry);
	return newPatientEntry;
};

const getPatientById = (id: string): Patient => {
	const data = patientsData.find((patient) => patient.id === id);
	if (!data) throw new Error("Patient id incorrect or patient doesn't exist");
	const patient = data;
	return patient;
};

const addPatientEntry = (id:string, entry: EntryWithoutId): Entry => {
	if (!entry.date || !entry.description || !entry.specialist) throw new Error ("Invalid entry format");
	switch (entry.type) {
		case "HealthCheck":
			if (isNaN(entry.healthCheckRating) || entry.healthCheckRating < 0 || entry.healthCheckRating > 3) throw new Error ("Invalid entry format");
			break;
		case "Hospital":
			if (!entry.discharge) throw new Error ("Invalid entry format");
			break;
		case "OccupationalHealthcare":
			if (!entry.employerName) throw new Error ("Invalid entry format");
			break;
		default:
			assertNever(entry);
	}

	const newPatientEntry: Entry = { id: uuidv4(), ...entry };
	const patientData = getPatientById(id);
	patientData.entries.push(newPatientEntry);
	patientsData = patientsData.map(data=> data.id === id ? patientData : data);
	return newPatientEntry;
};


export default {
	getEntries,
	getNonSensitiveEntries,
	addEntry,
	getPatientById,
	addPatientEntry
};
