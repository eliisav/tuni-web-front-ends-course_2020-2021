
const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}
// 11caaf9803eec7aefb723f4e74893379ff00501e


const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return { ...state, good: state.good+1 }
    case 'OK':
      return { ...state, ok: state.ok+1 }
    case 'BAD':
      return { ...state, bad: state.bad+1 }
    case 'ZERO':
      return initialState
    default: 
      return state
  }
  
}

export default counterReducer