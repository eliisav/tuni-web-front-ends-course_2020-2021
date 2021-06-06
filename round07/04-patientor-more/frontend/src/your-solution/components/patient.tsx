import React from "react";
import axios from "axios";
import { Icon, List, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { useStateValue, showPatient, addEntryToPatient } from "../state";
import { Patient, Entry, NewEntry } from "../types";
import EntryDetails from "./Entry";
import AddEntryModal from "../AddEntryModal";

const PatientDetails = () => {
  const [{patientToShow}, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const setPatient = async () => {
    try {
      const {data: patient} = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      console.log(patient);
      dispatch(showPatient(patient));
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntryToPatient(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  if (!patientToShow || patientToShow.id !== id) {
    void setPatient();
  }

  if (!patientToShow) {
    return null;
  }

  const iconType = () => {
    if (patientToShow.gender === 'male') {
      return 'mars';
    } else if (patientToShow.gender === "female") {
      return 'venus';
    } else {
      return 'transgender alternate';
    }
  };

  return (
    <div>
      <h2>{patientToShow.name} <Icon name={iconType()} /></h2>
      <div>ssn: {patientToShow.ssn}</div>
      <div>occupation: {patientToShow.occupation}</div>

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>

      <h3>entries</h3>
      {patientToShow.entries.length === 0 ? 'No entries' : null}
      <List celled relaxed>
        {patientToShow.entries.map(entry => (
          <EntryDetails key={entry.id} entry={entry}/>
        ))}
      </List>
    </div>
    
  );
};

export default PatientDetails;
