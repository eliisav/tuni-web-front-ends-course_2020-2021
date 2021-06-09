import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnosisList } from "./state";
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";
import PatientDetailPage from "./PatientDetailPage";

export { reducer, StateProvider } from "./state";

// ** enter commit sha of your repository in here **
export const commitSHA = "b3e5b1e";

export const App = () => {
	const [, dispatch] = useStateValue();
	React.useEffect(() => {
		void axios.get<void>(`${apiBaseUrl}/ping`);

		const fetchDiagnoseByCode = async () => {
				const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
					`${apiBaseUrl}/diagnoses/`
				);
				dispatch(setDiagnosisList(diagnosisListFromApi));
		};

		const fetchPatientList = async () => {
				const { data: patientListFromApi } = await axios.get<Patient[]>(
					`${apiBaseUrl}/patients`
				);
				dispatch(setPatientList(patientListFromApi));
		};

		try {
			void Promise.all([fetchPatientList(), fetchDiagnoseByCode()]);
		} catch (e) {
			console.error(e);
		}
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
							<PatientDetailPage />
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
