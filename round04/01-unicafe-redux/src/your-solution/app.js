import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

// ** enter commit sha of your repository in here **
export const commitSHA = '-commit-sha-in-here-';


export const store = createStore(reducer)


export const App = () => {
  return (
    <div>
      <button onClick={e => store.dispatch({type: 'GOOD'})}>good</button> 
      <button onClick={e => store.dispatch({type: 'OK'})}>neutral</button> 
      <button onClick={e => store.dispatch({type: 'BAD'})}>bad</button>
      <button onClick={e => store.dispatch({type: 'ZERO'})}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

