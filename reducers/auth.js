import {
    //アカウント登録
    REGISTER_SUCCESS,
    REGISTER_FAIL,

    // 読み込み中
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
} from '../actions/types'

const initialState = {
    user: null,
    isAuthenticated: null,
    loading: false,
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action
    
    switch (type) {
        //アカウント登録
        case REGISTER_SUCCESS:
            return {
                ...state,
            }
        case REGISTER_FAIL:
            return {
                ...state,
            }
        
        //読み込み中
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: true,
            }
        case REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading: false,
            }
        
        default:
            return state
    }
}

export default authReducer