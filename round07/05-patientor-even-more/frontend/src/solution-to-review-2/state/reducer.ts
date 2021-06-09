import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  |  {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
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
    type: "ADD_ENTRY";
    payload: {id:string, entry: Entry};
  }|{
    type: "ADD_DIAGNOSE";
    payload: Diagnosis;
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
      case "SET_DIAGNOSIS_LIST":
        return {
          ...state,
          diagnosis: {
            ...action.payload.reduce(
              (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
              {}
            ),
            ...state.diagnosis
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
          [action.payload.id]: {...state.patients[action.payload.id], ...action.payload}
        }
      };
    case "ADD_DIAGNOSE": 
      return {
        ...state,
        diagnosis: {...state.diagnosis, [action.payload.code]: action.payload }
      };
    case "ADD_ENTRY": {
      const id = action.payload.id;
      const entry = action.payload.entry;
      const entries = state.patients[id].entries?.concat(entry);
      const patient = {...state.patients[id], entries};
      return {
        ...state,
        patients: {...state.patients, [id]: patient}
      };
    }
    default:
      return state;
  }
};


export const setDiagnosisList = (diagnosisListFromApi: Diagnosis[]): Action => ({ type: "SET_DIAGNOSIS_LIST", payload: diagnosisListFromApi });
export const setPatientList = (patientListFromApi: Patient[]): Action => ({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
export const addPatient = (newPatient: Patient): Action => ({ type: "ADD_PATIENT", payload: newPatient });
export const addEntry = (newEntry:{id:string, entry: Entry}): Action => ({ type: "ADD_ENTRY", payload: newEntry });
export const addDiagnose = (newDiagnose: Diagnosis): Action => ({ type: "ADD_DIAGNOSE", payload: newDiagnose });
export const updatePatient = (patientFromApi: Patient): Action => ({ type: "ADD_PATIENT", payload: patientFromApi });
