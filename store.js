import { useMemo } from "react";
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
import { thunkMiddleware } from "redux-thunk";
import reducers from './reducers'

let store

function initStore(initialState) {
    return createBuilderStatusReporter(
        reducers, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)

    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        store = undefined
    }

    if (typeof window === 'undefined') return _store
    if (!store) store = _store
    
    return _store
}

export function userStore(initialState) {
    const store = userMemo(() => initializeStore(initialState), [initialState])
    
    return store
}