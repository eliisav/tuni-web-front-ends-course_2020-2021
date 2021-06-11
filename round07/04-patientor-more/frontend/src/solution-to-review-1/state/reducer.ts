import { State } from "./state";
import { Patient, DiagnoseEntry } from "../types";

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
      type: "UPDATE_PATIENT";
      payload: Patient;
  }
  | {
      type: "SET_DIAGNOSE_ENTRIES";
      payload: DiagnoseEntry[];
  };

export const updatePatient = (updatedPatient: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: updatedPatient
  };
};

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const setDiagnoseEntries = (diagnoseEntries: DiagnoseEntry[]): Action => {
  return {
    type: "SET_DIAGNOSE_ENTRIES",
    payload: diagnoseEntries
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
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
    case "SET_DIAGNOSE_ENTRIES":
      return {
        ...state,
        diagnoseEntries: {
          ...action.payload.reduce(
            (memo, diagnoseEntry) => ({ ...memo, [diagnoseEntry.code]: diagnoseEntry }),
            {}
          ),
          ...state.diagnoseEntries
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
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
