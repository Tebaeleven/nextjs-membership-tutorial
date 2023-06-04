import {
    //アカウント登録
    REGISTER_SUCCESS,
    REGISTER_FAIL,

    //ログイン
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    //ユーザー情報取得
    USER_SUCCESS,
    USER_FAIL,

    //リフレッシュトークン
    REFRESH_SUCCESS,
    REFRESH_FAIL,

    // 読み込み中
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
} from './types'

// アカウント登録
export const register = (name, email, password) => async (dispatch) => {
    dispatch({
        type:SET_AUTH_LOADING,
    })

    const body = JSON.stringify({
        name,
        email,
        password,
    })

    try {
        const res = await fetch('api/account/register', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:body
        })
        if (res.status === 200) {
            dispatch({
                type: REGISTER_SUCCESS,
            })
        } else {
            dispatch({
                type: REGISTER_FAIL,
            })
        }
    } catch (err){
        dispatch({
            type: REGISTER_FAIL,
        })
    }
    dispatch({
        type: REMOVE_AUTH_LOADING,
    })
}

export const login = (email, password) => async (dispatch) => {
    dispatch({
        type: SET_AUTH_LOADING,
    })

    const body = JSON.stringify({
        email,
        password,
    })

    try {
        const res = await fetch('api/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        })

        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
            })
            // ユーザー情報取得
            dispatch(user())
        } else {
            dispatch({
                type: LOGIN_FAIL,
            })
        }
    } catch (err) {
        dispatch({
            type:LOGIN_FAIL,
        })
    }


    dispatch({
        type: REMOVE_AUTH_LOADING,
    })

}

export const user = () => async (dispatch) => {
    dispatch({
        type: SET_AUTH_LOADING,
    })

    try {
        const res = await fetch('api/account/user', {
            method: 'GET',
        })
        const data = await res.json()
        
        if (res.status === 200) {
            dispatch({
                type: USER_SUCCESS,
                payload:data,
            })

        } else {
            dispatch({
                type: USER_FAIL,
            })
        }
    } catch (error) {
        
    }
    dispatch({
        type: REMOVE_AUTH_LOADING,
    })
}

//リフレッシュトークン
export const refresh = () => async (dispatch) => {
    dispatch({
        type: SET_AUTH_LOADING,
    })

    try {
        const res = await fetch('api/account/refresh', {
            method: 'GET',
        })

        if (res.status===200) {
            dispatch({
                type: REFRESH_SUCCESS,
            })

            dispatch(verify())
        }
    } catch (err) {
        dispatch({
            type: REFRESH_FAIL,
        })
    }

    dispatch({
        type: REMOVE_AUTH_LOADING,
    })
}