import { Provider } from 'react-redux'
import { useStore } from '../store'
import Layout from '@/components/Layout'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)

  return (
      <Provider store={store}>
          <Layout>
              <Component {...pageProps} />
          </Layout>
      </Provider>
  );
}
