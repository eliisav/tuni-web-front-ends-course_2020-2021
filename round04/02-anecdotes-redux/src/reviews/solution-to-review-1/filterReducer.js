const initialState = 
{
    text: ''
}

export const updateFilter = (str) =>
{
    return { type: filterReducer.ACTION_TYPES.UPDATE, data: str }
}

const _handleUpdate = (state, data) =>
{
    return { ...state, text: data }
}

const filterReducer = (state = initialState, action) => 
{
    switch(action.type)
    {
        case filterReducer.ACTION_TYPES.UPDATE:
            return _handleUpdate(state, action.data)

        default:
            return state
    }
}

filterReducer.ACTION_TYPES=
{
    UPDATE: 'UPDATE'
}

export default filterReducer