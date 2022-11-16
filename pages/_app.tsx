import type { ReactElement, ReactNode } from 'react'
import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import '../styles/globals.css'
import Default from 'layouts/Default'

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

  return <div>{layout(<Component {...pageProps} />)}</div>
}

export default MyApp
