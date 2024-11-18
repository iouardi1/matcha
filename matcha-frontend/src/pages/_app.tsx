import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../redux/store'

import '@/styles/globals.css'
import '@/styles/auth.css'
import '@/styles/sideBar.css'
import '@/styles/messages.css'
import '@/styles/matches.css'
import { SocketProvider } from '@/redux/context/SocketContext'
import { useRouter } from 'next/router'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const router = useRouter()
    // Use the layout defined at the page level, if available
    const isSocketPage = router.pathname === '/accueil'
    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <Provider store={store}>
            {isSocketPage ? (
                <SocketProvider>
                    {getLayout(<Component {...pageProps} />)}
                </SocketProvider>
            ) : (
                getLayout(<Component {...pageProps} />)
            )}
        </Provider>
    )
}
