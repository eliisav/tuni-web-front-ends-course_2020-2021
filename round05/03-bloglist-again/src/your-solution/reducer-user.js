
import { blogService, userService } from './services'
import { setNotification } from './reducer-notification'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    default: return state
  }

}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    console.log('users got from api', users)
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default userReducer
