
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducer-notification'
import blogReducer from './reducer-blog'
import loginReducer from './reducer-login'
import userReducer from './reducer-user'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  loginUser: loginReducer,
  users: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
