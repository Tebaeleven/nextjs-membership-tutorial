import {
    //アカウント登録
    REGISTER_SUCCESS,
    REGISTER_FAIL,

    //ログイン
    LOGIN_SUCCESS,
    LOGIN_FAIL,

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
        
        // ログイン
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
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