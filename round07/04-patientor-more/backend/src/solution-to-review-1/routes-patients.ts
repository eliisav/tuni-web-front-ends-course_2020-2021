import express from 'express';
import toNewPatientEntry from './utils';
import patientService from './services-patients';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitiveEntries());
})


router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
      
    const addedEntry = patientService.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message); 
  }
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatientEntryById(id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send(); 
  }
})


export default router;
