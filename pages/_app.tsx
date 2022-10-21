import '../styles/globals.css'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import Default from 'layouts/Default'

type LayoutPage = NextPage & {
  layout?: (page: ReactElement) => ReactNode
}

type LayoutProps = AppProps & {
  Component: LayoutPage
}

const MyApp = ({ Component, pageProps }: LayoutProps) => {
  const layout = Component.layout ?? ((page) => <Default>{page}</Default>)

  return <div>{layout(<Component {...pageProps} />)}</div>
}

export default MyApp
