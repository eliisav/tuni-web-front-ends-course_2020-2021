import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

// ** enter commit sha of your repository in here **
export const commitSHA = '11caaf9803eec7aefb723f4e74893379ff00501e';
export const store = createStore(reducer)


export const App = () => {

  const onClickGood = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const onClickNeutral = () => {
    store.dispatch({
      type: 'OK' // should it be neutral?
    })
  }
  const onClickBad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const onClickReset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={onClickGood}>good</button> 
      <button onClick={onClickNeutral}>neutral</button> 
      <button onClick={onClickBad}>bad</button>
      <button onClick={onClickReset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

