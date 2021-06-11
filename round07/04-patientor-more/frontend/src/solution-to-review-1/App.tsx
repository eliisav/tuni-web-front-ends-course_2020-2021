import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnoseEntries } from "./state";
import { Patient, DiagnoseEntry } from "./types";

import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage";

export { reducer, StateProvider } from "./state";

// ** enter commit sha of your repository in here **
export const commitSHA = 'f86e4c3';


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

    const fetchDiagnoseEntries = async () => {
      try {
        const { data: diagnoseEntriesFromApi } = await axios.get<DiagnoseEntry[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnoseEntries(diagnoseEntriesFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoseEntries();
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
            <Route exact path="/">
              <PatientListPage />
            </Route>
            <Route path="/patients/:id">
              <PatientPage/> 
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

