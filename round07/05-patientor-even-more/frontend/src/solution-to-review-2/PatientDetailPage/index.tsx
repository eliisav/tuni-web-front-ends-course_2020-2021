import React, { useState, useEffect } from "react";
import { Container, Header, Icon, Button } from "semantic-ui-react";
import axios from "axios";
import EntryDetail from "./Entry";
import { useParams } from "react-router-dom";
import { Patient, Gender, EntryWithoutId, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient, addEntry } from "../state";
import AddEntryModal from "../PatientEntryModal";
import { EntryFormValues } from '../PatientEntryModal/AddEntryForm';

const PatientDetailPage = () => {
	const [{ patients }, dispatch] = useStateValue();
	const { id } = useParams<{ id: string }>();
	// const [patient, setPatient] = useState<Patient>(patients[id]);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [error, setError] = React.useState<string | undefined>();

	if (!patients || !patients[id]) window.location.href = "http://localhost:3000/";

	useEffect(() => {
		const fetchUserById = async (id: string) => {
			try {
				const { data: patientFromApi } = await axios.get<Patient>(
					`${apiBaseUrl}/patients/${id}`
				);
				// setPatient(patientFromApi);
				dispatch(updatePatient(patientFromApi));
			} catch (e) {
				console.error(e);
			}
		};
		if (!isFullPatient(patients[id])) {
			void fetchUserById(id);
		}
	}, []);

	const isFullPatient = (param: Patient): boolean => {
		return (
			typeof param.ssn === "string" && typeof param.dateOfBirth === "string"
		);
	};

	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};
	const submitNewEntry = async (values: EntryFormValues ) => {
        const entryWithoutId: EntryWithoutId = {...values, date: new Date().toISOString().substr(0,10) };
		console.log(entryWithoutId);
        try {
            const { data: entry } = await axios.post<Entry>(
              `${apiBaseUrl}/patients/${id}/entries`,
              entryWithoutId
            );
            
            dispatch(addEntry({id, entry}));
            closeModal();
          } catch (e) {
            console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data?.error || 'Unknown error');
          }
        console.log(values);
    };
	return (
		<Container>
			{patients || (patients[id] && isFullPatient(patients[id])) ? (
				<div>
					<Header as="h2">
						{patients[id].name}{" "}
						{patients[id].gender === Gender.Male ? (
							<Icon name="man" />
						) : patients[id].gender === Gender.Female ? (
							<Icon name="woman" />
						) : (
							<Icon name="genderless" />
						)}
					</Header>
					<p>
						ssn: {patients[id].ssn}
						<br />
						occupation: {patients[id].occupation}
					</p>
					<Header as="h3">entries</Header>

					{patients[id].entries?.length
						? patients[id].entries?.map((entry) => (
								<EntryDetail key={entry.id} entry={entry} />
						))
						: "No Entries made"}
				</div>
			) : (
				<div>loading....</div>
			)}
			<AddEntryModal
				modalOpen={modalOpen}
				onSubmit={submitNewEntry}
				error={error}
				onClose={closeModal}
			/>
            <br />
			<Button onClick={() => setModalOpen(true)}>Add New Entry</Button>
            <br />
            <br />
            <br />
		</Container>
	);
};

export default PatientDetailPage;
