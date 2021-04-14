import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

// ** enter commit sha of your repository in here **
export const commitSHA = '-commit-sha-in-here-';


export const store = createStore(reducer)


export const App = () => {

  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button>neutral</button> 
      <button>bad</button>
      <button>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral</div>
      <div>bad</div>
    </div>
  )
}

