import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnoses } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientDetails from "./components/Patient";

export { reducer, StateProvider } from "./state";

// ** enter commit sha of your repository in here **
export const commitSHA = '1ddcd40';


export const App = () => {
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnoses(diagnosesFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id">
              <PatientDetails />
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};
