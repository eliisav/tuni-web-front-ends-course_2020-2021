
import { createStore, combineReducers } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducer-anecdote'
import notificationReducer from './reducer-notification'
import filterReducer from './reducer-filter'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(
  reducer
  // ,
  // composeWithDevTools()
)

export default store
