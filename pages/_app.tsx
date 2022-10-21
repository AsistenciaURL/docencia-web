import type { ReactElement, ReactNode } from 'react'
import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import '../styles/globals.css'

import Default from 'layouts/Default'
import SnackbarProvider from 'context/SnackbarProvider'
import SessionProvider from 'context/AuthProvider'
import Snackbar from 'components/core/Snackbar'

type LayoutPage = NextPage & {
  layout?: (page: ReactElement) => ReactNode
}

type LayoutProps = AppProps & {
  Component: LayoutPage
}

const MyApp = ({ Component, pageProps }: LayoutProps) => {
  const layout = Component.layout ?? ((page) => <Default>{page}</Default>)
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <SessionProvider>
      <SnackbarProvider>
        {layout(<Component {...pageProps} />)}
        <Snackbar />
      </SnackbarProvider>
    </SessionProvider>
  )
}

export default MyApp
