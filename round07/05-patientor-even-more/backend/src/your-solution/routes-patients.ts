import express from 'express';
import toNewPatientEntry, { toNewEntry } from './utils';
import patientService from './services-patients';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
      
    const addedEntry = patientService.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message); 
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientService.getPatient(req.params.id);
    const newEntry = toNewEntry(req.body);

    if (!patient || !newEntry) {
      res.sendStatus(404);

    } else {
      const addedEntry = patientService.addEntryToPatient(patient, newEntry);
      res.json(addedEntry);
    }

  } catch (e) {
    res.status(400).send(e.message);
  }

});


export default router;
