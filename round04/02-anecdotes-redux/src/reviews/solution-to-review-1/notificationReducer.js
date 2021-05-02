const initialState = 
{
    text: undefined
}

export const showNotification = (message) =>
{
    return {
        type: notificationReducer.ACTION_TYPES.SHOW,
        data: String(message)
    }
}
export const cleanNotification = () =>
{
    return { type: notificationReducer.ACTION_TYPES.HIDE }
}

const notificationReducer = (state = initialState, action) => 
{
    switch(action.type)
    {
        case notificationReducer.ACTION_TYPES.SHOW:
            return { ...state, text: action.data }
        
        case notificationReducer.ACTION_TYPES.HIDE:
            return { ...state, text: undefined }

        default:
            return state
    }
}

notificationReducer.ACTION_TYPES=
{
    SHOW: 'SHOW',
    HIDE: 'HIDE'
}

export default notificationReducer