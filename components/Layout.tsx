import Head from "next/head"
import Navigation from './Navigation'
import { useDebugValue, useEffect } from "react"
import { useDispatch } from "react-redux"
import { refresh } from '../actions/auth'

export default function Layout(props) {
    const dispatch = useDispatch()
    
    useEffect(() => {
        const fn = async () => {
            if (dispatch && dispatch !== null && dispatch !== undefined) {
                await dispatch(refresh())
            }
        }
    }, [dispatch])
    
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Navigation></Navigation>
            <div className="max0w-7xl mx-auto px-8 py-6">{props.children}</div>
        </>
    )
}
