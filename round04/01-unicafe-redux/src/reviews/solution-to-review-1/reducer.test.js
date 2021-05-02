import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

// *** enter commit sha of your repository in here ***
const commitSHA = 'commit-sha-in-here'

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

      const newState = counterReducer(undefined, action)
      expect(newState).toEqual(initialState)
    })

    test('Good is incremented', () => {
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

    test('Ok is incremented', () => {
      const action = {
        type: 'OK'
      }
      const state = initialState

      deepFreeze(state)
      const newState = counterReducer(state, action)
      expect(newState).toEqual({
        good: 0,
        ok: 1,
        bad: 0
      })
    })

    test('Bad is incremented', () => {
      const action = {
        type: 'BAD'
      }
      const state = initialState

      deepFreeze(state)
      const newState = counterReducer(state, action)
      expect(newState).toEqual({
        good: 0,
        ok: 0,
        bad: 1
      })
    })

    test('Unknown actions will not increment values', () => {
      const action = {
        type: 'WHATEVER'
      }
      const state = initialState

      deepFreeze(state)
      const newState = counterReducer(state, action)
      expect(newState).toEqual({
        good: 0,
        ok: 0,
        bad: 0
      })
    }) 

    test('Zero resets all statistics', () => {
      const action = {
        type: 'ZERO'
      }

      const state = {
        good: 3,
        ok: 4,
        bad: 2
      }

      deepFreeze(state)
      const newState = counterReducer(state, action)
      expect(newState).toEqual({
        good: 0,
        ok: 0,
        bad: 0
      })
    }) 
  })
})