import express from "express";
import toNewPatientEntry from "./utils";
import patientService from "./services-patients";
import { EntryWithoutId } from "./types";

const router = express.Router();

router.post("/:id/entries/", (req, res) => {
	const id:string = req.params.id;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const entry:EntryWithoutId = req.body;
  try{
    const newEntry = patientService.addPatientEntry(id, entry);
    res.json(newEntry);
  }catch (e) {
		res.status(400).send(e);
	}
});

router.get("/:id/", (req, res) => {
	const id = req.params.id;
  try{
    const patient = patientService.getPatientById(id);
    res.json(patient);
  }catch (e) {
		res.status(400).send(e);
	}
});

router.get("/", (_req, res) => {
	res.json(patientService.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
	try {
		const newPatientEntry = toNewPatientEntry(req.body);

		const addedEntry = patientService.addEntry(newPatientEntry);
		res.json(addedEntry);
	} catch (e) {
		res.status(400).send(e);
	}
});

export default router;
