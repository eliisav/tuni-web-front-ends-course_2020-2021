import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SHOW_PATIENT";
      payload: Patient;
    }
    | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    }
    | {
      type: "ADD_ENTRY";
      payload: { entry: Entry }
    };


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SHOW_PATIENT":
      return {
        ...state,
        patientToShow: action.payload
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY":
      const updatedPatient = state.patientToShow
        ? {
          ...state.patientToShow,
          entries: state.patientToShow.entries.concat(action.payload.entry)
        }
        : undefined;

      return {
        ...state,
        patientToShow: updatedPatient
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const showPatient = (patient: Patient): Action => {
  return {
    type: "SHOW_PATIENT",
    payload: patient
  };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses
  };
};

export const addEntryToPatient = (entry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: { entry }
  };
};
