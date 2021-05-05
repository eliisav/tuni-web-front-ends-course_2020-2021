
import { userService } from './services'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    case 'ADD_BLOG_USER':
      const blog = action.data
      return state.map(u => 
        u.id !== blog.userId
        ? u 
        : {...u, blogs: u.blogs.concat(blog)})

    default: return state
  }

}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()

    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const updateUsersBlogs = (blog) => {
  return {
    type: 'ADD_BLOG_USER',
    data: blog
  }
}

export default userReducer
