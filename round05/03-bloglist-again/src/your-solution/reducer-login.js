import { loginService, blogService } from './services'
import { setNotification } from './reducer-notification'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'REMOVE_USER':
      return null
    
    default: return state
  }
}

export const initializeLogin = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)

      dispatch({
        type: 'SET_USER',
        data: user
      })

      blogService.setToken(user.token)
    }
  }
}

export const logUserIn = (userToLogIn) => {
  return async dispatch => {
    try {
      const user = await loginService.login(userToLogIn)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      dispatch({
        type: 'SET_USER',
        data: user
      })

      blogService.setToken(user.token)

      dispatch(setNotification({ text: `${user.username} logged in` }))

    } catch (exception) {
      dispatch(setNotification({ error: true, text: 'wrong username or password' }))
    }
  }
}

export const logUserOut = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser')

    dispatch({
      type: 'REMOVE_USER'
    })

    blogService.setToken(null)
  }
}

export default loginReducer
