import { setNotification } from './reducer-notification'
import {blogService} from './services'

//reducer used to manage notifications for the application
export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch({ type: 'INIT_BLOGS', data: blogs })
    } catch (error) {
      dispatch(setNotification('Error initializing list of blogs', 'error'))
    }
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch({ type: 'CREATE_BLOG', data: newBlog })
      dispatch(
        setNotification(`New blog created: ${newBlog.title} by ${newBlog.author}`, 'success')
      )
    } catch (error) {
      dispatch(setNotification(`Error creating blog ${blogObject.title}`, 'error'))
    }
  }
}

export const updateBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blogObject)
      dispatch({ type: 'ADD_LIKE', data: updatedBlog })
      dispatch(setNotification(`Like added: ${updatedBlog.title}`, 'success'))
    } catch (error) {
      dispatch(setNotification(`Error adding like to blog ${blogObject.title}`, 'error'))
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const response = await blogService.remove(id)
    if (response.status === 204) {
      dispatch({ type: 'DELETE_BLOG', data: { id } })
      dispatch(setNotification('Successfully removed blog', 'success'))
    } else {
      dispatch(setNotification('Error deleting blog', 'error'))
    }
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'CREATE_BLOG':
    return [...state, action.data]
  case 'ADD_LIKE':
    return state.map((b) => (b.id === action.data.id ? action.data : b))
  case 'DELETE_BLOG':
    return state.filter((b) => b.id !== action.data.id)
  default:
    return state
  }
}

export default blogReducer