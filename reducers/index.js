import { conbineReducers } from 'redux'
import authReducer from './auth'

export default conbineReducers({
    auth: authReducer
})