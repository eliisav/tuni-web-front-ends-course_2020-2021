import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { assertNever } from "../utils";

import {
	TextField,
	SelectField,
	HealthCheckRatingOption,
	DiagnosisSelection,
	EntryTypeOption,
} from "./FormField";
import {
	HealthCheckRating,
	Entry,
	EntryType,
	EntryTypes,
	UnionOmit,
} from "../types";
import { useStateValue } from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = UnionOmit<Entry, "id" | "date">;

interface Props {
	onSubmit: (values: EntryFormValues) => void;
	onCancel: () => void;
}

interface InitialValues {
	type: EntryType;
	description: string;
	specialist: string;
	diagnosisCodes: string[];
	healthCheckRating: HealthCheckRating;
	employerName: string;
	sickLeave: { startDate: string; endDate: string };
	discharge: { date: string; criteria: string };
}

interface ErrorValues {
	description?: string;
	specialist?: string;
	diagnosisCodes?: string;
	healthCheckRating?: string;
	employerName?: string;
	discharge?: { date?: string; criteria?: string };
	sickLeave?: { startDate?: string; endDate?: string };
}

const healthCheckRatingOption: HealthCheckRatingOption[] = [
	{ value: HealthCheckRating.Healthy, label: "Healthy" },
	{ value: HealthCheckRating.LowRisk, label: "Low risk" },
	{ value: HealthCheckRating.HighRisk, label: "High risk" },
	{ value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

const entryTypeOption: EntryTypeOption[] = [
	{ value: EntryTypes.HealthCheck, label: "Health Check" },
	{ value: EntryTypes.Hospital, label: "Hospital" },
	{
		value: EntryTypes.OccupationalHealthcare,
		label: "Occupational healthcare",
	},
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
	const [{ diagnosis }] = useStateValue();

	const optionalEntryFields = (type: EntryType) => {
		switch (type) {
			case "HealthCheck":
				return (
					<SelectField
						label="Health Check Rating"
						name="healthCheckRating"
						options={healthCheckRatingOption}
					/>
				);
			case "Hospital":
				return (
					<Grid columns="equal">
						<Grid.Row>
							<Grid.Column>
								<Field
									label="Discharge Criteria"
									placeholder="Criteria"
									name="discharge.criteria"
									component={TextField}
								/>
							</Grid.Column>
							<Grid.Column>
								<Field
									label="Discharge Date"
									placeholder="YYYY-MM-DD"
									name="discharge.date"
									component={TextField}
								/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				);
			case "OccupationalHealthcare":
				return (
					<>
						<Field
							label="Employer Name"
							placeholder="Employer Name"
							name="employerName"
							component={TextField}
						/>
						<Grid columns="equal">
							<Grid.Row>
								<Grid.Column>
									<Field
										label="Sick leave (start date)"
										placeholder="YYYY-MM-DD"
										name="sickLeave.startDate"
										component={TextField}
									/>
								</Grid.Column>
								<Grid.Column>
									<Field
										label="Sick leave (end date)"
										placeholder="YYYY-MM-DD"
										name="sickLeave.endDate"
										component={TextField}
									/>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</>
				);
			default:
				assertNever(type);
		}
	};

	const specialiseEntry = ({
		healthCheckRating,
		employerName,
		type,
		sickLeave,
		discharge,
		...others
	}: InitialValues): EntryFormValues => {
		switch (type) {
			case "HealthCheck":
				return { ...others, healthCheckRating, type };
			case "OccupationalHealthcare":
				return {
					...others,
					employerName,
					sickLeave,
					type,
				};
			case "Hospital":
				return {
					discharge,
					type,
					...others,
				};
			default:
				return assertNever(type);
		}
	};

	return (
		<Formik
			initialValues={{
				type: "HealthCheck",
				description: "",
				specialist: "",
				diagnosisCodes: [],

				// HealthCheck
				healthCheckRating: HealthCheckRating.Healthy,

				// Occupational Healthcare Entry
				employerName: "",
				sickLeave: { startDate: "", endDate: "" },

				// Hospital Entry
				discharge: { date: "", criteria: "" },
			}}
			onSubmit={(values: InitialValues) => onSubmit(specialiseEntry(values))}
			validate={(values) => {
				const requiredError = "Field is required";
				const badFormat = "Field incorrectly formatted";
				const regex1 = RegExp(/^(\d{4})([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/);
				const errors: ErrorValues = {};
				if (!values.description) {
					errors.description = requiredError;
				}
				if (!values.specialist) {
					errors.specialist = requiredError;
				}

				switch (values.type) {
					case "HealthCheck":
						if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
							errors.healthCheckRating = requiredError;
						}
						break;
					case "Hospital":
						if (!values.discharge.criteria) {
							!errors.discharge && (errors.discharge = {});
							errors.discharge.criteria = requiredError;
						}
						if (!values.discharge.date) {
							!errors.discharge && (errors.discharge = {});
							errors.discharge.date = requiredError;
						}else if(regex1.exec(values.discharge.date) === null){
							!errors.discharge && (errors.discharge = {});
							errors.discharge.date = badFormat;
						}
						break;
					case "OccupationalHealthcare":
						if (!values.employerName) {
							errors.employerName = requiredError;
						}
						if(values.sickLeave.startDate && regex1.exec(values.sickLeave.startDate)){
							!errors.sickLeave && (errors.sickLeave = {});
							errors.sickLeave.startDate = badFormat;
						}
						if(values.sickLeave.endDate && regex1.exec(values.sickLeave.endDate)){
							!errors.sickLeave && (errors.sickLeave = {});
							errors.sickLeave.endDate = badFormat;
						}
						break;
					default:
						assertNever(values.type);
				}

				return errors;
			}}
		>
			{({ isValid, dirty, values, setFieldValue, setFieldTouched}) => {
				return (
					<Form className="form ui">
						<SelectField
							label="Entry Type"
							name="type"
							options={entryTypeOption}
						/>
						<Field
							label="Description"
							placeholder="description"
							name="description"
							component={TextField}
						/>
						<DiagnosisSelection
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
							diagnoses={Object.values(diagnosis)}
						/>

						{optionalEntryFields(values.type)}

						<Field
							label="Specialist"
							placeholder="specialist"
							name="specialist"
							component={TextField}
						/>
						<Grid>
							<Grid.Column floated="left" width={5}>
								<Button type="button" onClick={onCancel} color="red">
									Cancel
								</Button>
							</Grid.Column>
							<Grid.Column floated="right" width={5}>
								<Button
									type="submit"
									floated="right"
									color="green"
									disabled={!dirty || !isValid}
								>
									Add
								</Button>
							</Grid.Column>
						</Grid>
					</Form>
				);
			}}
		</Formik>
	);
};

export default AddEntryForm;
