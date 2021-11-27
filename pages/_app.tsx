import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';
import getLibrary from '../getLibrary';
import { DebugProvider } from '../providers/DebugProvider';
import { GlobalStyle } from '../providers/GlobalStyle';

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <DebugProvider>
        <GlobalStyle></GlobalStyle>
        <Component {...pageProps} />
      </DebugProvider>
    </Web3ReactProvider>
  );
}

export default NextWeb3App;
