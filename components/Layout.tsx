import React, { ReactNode } from 'react';
import Head from 'next/head';
import Account from './Account';
import { useWalletConnect } from '../hooks/walletConnect';
import DebugLogs from './DebugLogs';

type Props = {
  children?: ReactNode
  title?: string
}


const Layout = ({ children, title = 'Farm @ Home' }: Props) => {
  return <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      {/*<nav>*/}
      {/*  <Link href="/">*/}
      {/*    <a>Home</a>*/}
      {/*  </Link>*/}
      {/*</nav>*/}
      <Account></Account>
    </header>
    {children}
    <footer>
      <DebugLogs></DebugLogs>
    </footer>
  </div>
}

export default Layout
