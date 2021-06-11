import React, { useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from '../constants';
import { useParams } from "react-router";
import { Icon } from "semantic-ui-react";
import { Patient } from "../types";
import { useStateValue } from "../state";

const GenderIcon = ({ gender }: { gender: string}) => {
  if (gender === 'male') {
    return <Icon disabled name='mars'></Icon>;
  } else if (gender === 'female') {
    return <Icon disabled name='venus'></Icon>;
  } else {
    return <Icon disabled name='question circle outline'></Icon>;
  }
};

const PatientDetailsView = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const currentPatient: Patient | undefined = patients[id];

  useEffect(() => {
    axios
      .get<Patient>(`${apiBaseUrl}/patients/${id}`)
      .then(response => {
        if (response.data) {
          dispatch({ type: "UPDATE_PATIENT", payload: response.data});
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  if (currentPatient === undefined) {
    return <div>No patient data.</div>;
  }

  return (
    <div>
      <h2>
        {currentPatient.name}{' '}
        <GenderIcon gender={currentPatient.gender}></GenderIcon>
      </h2>
      <p>ssn: {currentPatient.ssn}</p>
      <p>occupation: {currentPatient.occupation}</p>
    </div>
  );
};

export default PatientDetailsView;
