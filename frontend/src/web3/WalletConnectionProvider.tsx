"use client";

import { useMemo, type ReactNode } from 'react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl } from '@solana/web3.js';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import {
    PhantomWalletAdapter,
    TorusWalletAdapter,
    SolflareWalletAdapter,
    AvanaWalletAdapter,
    CoinbaseWalletAdapter,
    Coin98WalletAdapter,
    SaifuWalletAdapter,
    SkyWalletAdapter
} from '@solana/wallet-adapter-wallets';

import '@solana/wallet-adapter-react-ui/styles.css';

type Props = {
    children: ReactNode;
}

const WalletConnectionProvider = ({ children }: Props) => {
    const solNetwork = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);

    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
        new TorusWalletAdapter(),
        new SolflareWalletAdapter(),
        new AvanaWalletAdapter(),
        new CoinbaseWalletAdapter(),
        new Coin98WalletAdapter(),
        new SaifuWalletAdapter(),
        new SkyWalletAdapter()
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

export default WalletConnectionProvider