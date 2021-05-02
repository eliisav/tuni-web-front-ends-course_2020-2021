
import { createStore, combineReducers } from 'redux'
import reducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import filterReducer from './filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const combinedReducer = combineReducers(
{
    anecdotes: reducer, 
    notification: notificationReducer,
    filter: filterReducer
})

const store = createStore(combinedReducer, composeWithDevTools())

export default store