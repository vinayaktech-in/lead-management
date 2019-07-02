import { combineReducers } from 'redux'
import userReducers from './user.reducers'
import leadReducers from './lead.reducers'
const rootReducer = combineReducers({
  session: userReducers,
  lead : leadReducers
})

export default rootReducer
