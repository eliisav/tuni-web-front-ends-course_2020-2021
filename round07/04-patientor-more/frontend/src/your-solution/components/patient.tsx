import React from "react";
import axios from "axios";
import { Icon } from 'semantic-ui-react';
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { useStateValue, showPatient } from "../state";
import { Patient } from "../types";

const PatientDetails = () => {
  const [{patientToShow}, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const setPatient = async () => {
    try {
      const {data: patient} = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      console.log(patient);
      dispatch(showPatient(patient));
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      //setError(e.response?.data?.error || 'Unknown error');
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
    } else if(patientToShow.gender === "female") {
      return 'venus';
    } else {
      return 'transgender alternate';
    }
  };

  return (
    <div>
      <h2>{patientToShow.name} <Icon name={iconType()}/></h2>
      <div>ssn: {patientToShow.ssn}</div>
      <div>occupation: {patientToShow.occupation}</div>

      <h3>entries</h3>
      {patientToShow.entries.map(entry => 
        <div key={entry.id}>
          <p >{entry.date} {entry.description}</p>
          <ul>
            {entry.diagnosisCodes?.map(code => <li key={code}>{code}</li>)}
          </ul>
        </div>
      )}
    </div>
    
  );
};

export default PatientDetails;
