import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

// *** enter commit sha of your repository in here ***
const commitSHA = '11caaf9803eec7aefb723f4e74893379ff00501e'

// *** do not remove or change this line ***
describe(`\nUNIT TESTS ${process.env.SOLUTION || 'your-solution'} [ ${commitSHA} ]\n`, () => {


  describe('unicafe reducer', () => {

    const initialState = {
      good: 0,
      ok: 0,
      bad: 0
    }

    test('should return a proper initial state when called with undefined state', () => {
      const state = {}
      const action = {
        type: 'DO_NOTHING'
      }

      // Add deep freeze testing:
      deepFreeze(state)

      const newState = counterReducer(undefined, action)
      expect(newState).toEqual(initialState)


    })

    test('good is incremented', () => {
      const action = {
        type: 'GOOD'
      }
      const state = initialState

      deepFreeze(state)
      const newState = counterReducer(state, action)
      expect(newState).toEqual({
        good: 1,
        ok: 0,
        bad: 0
      })
    })

    test('bad is incremented', () => {
      const action = {
        type: 'BAD'
      }
      const state = {
        good: 1000,
        ok: 0,
        bad: 99
      }

      deepFreeze(state)
      const newState = counterReducer(state, action)
      expect(newState).toEqual({...state, bad: 100})
    })

    test('reset works after one increase', () => {
      const action = {
        type: 'ZERO'
      }
      const state = {
        good: Math.floor(Math.random()*1000),
        ok: Math.floor(Math.random()*1000),
        bad: Math.floor(Math.random()*1000),
      }

      deepFreeze(state)
      const stateOkIncreased = counterReducer(state, {type:"OK"})
      const newState = counterReducer(stateOkIncreased, action)
      expect(newState).toEqual({good:0, ok:0, bad:0})
    })

  })


})