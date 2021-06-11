import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { Patient } from '../types';

const PatientButton = ({ patient }: { patient: Patient }) => {
  return (
    <Button as={Link} to={`/patients/${patient.id}`}>{patient.name}</Button> 
  );
};

export default PatientButton;
