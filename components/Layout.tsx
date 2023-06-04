import Head from "next/head"
import Navigation from './Navigation'
export default function Layout(props) {
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
