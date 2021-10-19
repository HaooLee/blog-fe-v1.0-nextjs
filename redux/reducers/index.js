import { combineReducers } from 'redux'
import { headerReducer } from './headerReducer'



// COMBINED REDUCERS
const reducers = {
    header:headerReducer
}

export default combineReducers(reducers)
