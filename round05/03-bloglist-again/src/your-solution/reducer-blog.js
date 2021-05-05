import { blogService } from './services'
import { setNotification } from './reducer-notification'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE_BLOG':
      const liked = action.data
      return state.map(blog =>
        blog.id !== liked.id ? blog : liked).sort((a, b) => (b.likes - a.likes))
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data)
    default: return state
  }

}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blogObject) => {
  return async dispatch => {
    try {
      const likedBlog = await blogService.update(blogObject.id, blogObject)
      dispatch({
        type: 'LIKE_BLOG',
        data: likedBlog
      })
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification({text: 'Failed to update blog likes', error: true}))
    }

  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export default blogReducer
