import { useMemo, type ReactNode } from 'react'
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import {
  PhantomWalletAdapter,
  CoinbaseWalletAdapter,
  SaifuWalletAdapter,
  AvanaWalletAdapter,
  BitgetWalletAdapter,
  CloverWalletAdapter,
  SolflareWalletAdapter,
  SalmonWalletAdapter,
  SkyWalletAdapter,
  TorusWalletAdapter
} from '@solana/wallet-adapter-wallets';

const WalletAdapterProvider = ({ children }: {
  children: ReactNode
}) => {
    const solNetwork = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
    const wallets = useMemo(() => [
      new PhantomWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new SaifuWalletAdapter(),
      new AvanaWalletAdapter(),
      new BitgetWalletAdapter(),
      new CloverWalletAdapter(),
      new SolflareWalletAdapter(),
      new SalmonWalletAdapter(),
      new SkyWalletAdapter(),
      new TorusWalletAdapter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ], [solNetwork]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default WalletAdapterProvider