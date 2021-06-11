import React from "react";
import axios from "axios";
import { Container, Header, Icon } from "semantic-ui-react";

import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { EntryDetails } from "../components/EntryDetails";



const PatientListPage = () => {
  const [{ patients }, dispatch] = useStateValue();

  const [error, setError] = React.useState<string | undefined>();
  const { id } = useParams<{ id: string }>();

  const getPatientIfNotFullInfo = async (id: string) => {
    if (patients[id] && patients[id].ssn) return;
    try {
      const { data: Patient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`,
      );
      dispatch(updatePatient(Patient));
    } catch (e) {
      console.error(e.response?.status || 'Unknown error');
      setError(e.response?.status || 'Unknown error');
    }
  };

  React.useEffect(() => {
    void getPatientIfNotFullInfo(id);
  }, []);

  
  if (error) {
    return (
      <div className="App">
        {error}
      </div>
    );
  }

  if (patients[id] && patients[id].ssn) {
    const patient = patients[id];
    const gender = (patient.gender == "male") ? "mars" :
                   (patient.gender == "female" ? "venus" : "genderless");
    const entryDetails = patient.entries.map(entry =>
       <EntryDetails key={entry.id} entry={entry}/>);
    return (
      <div className="App">
        <Container>
          <Header as="h1">{patient.name}<Icon className={gender}></Icon></Header>
          
          <div>ssn: { patient.ssn }</div>
          <div>occupation: { patient.occupation }</div>
          {entryDetails}
        </Container>
      </div>
    );
  }

  return (
    <div className="App">Loading...</div>
  );
  
};

export default PatientListPage;
