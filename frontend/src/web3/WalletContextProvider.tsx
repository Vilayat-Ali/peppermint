import { useMemo, type ReactNode } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';

// Wallets
import {
    PhantomWalletAdapter,
    CloverWalletAdapter,
    CoinbaseWalletAdapter,
    SolflareWalletAdapter,
    SafePalWalletAdapter,
    AvanaWalletAdapter,
    CoinhubWalletAdapter,
    NekoWalletAdapter  
} from '@solana/wallet-adapter-wallets';

// styles
import "@solana/wallet-adapter-react-ui/styles.css";

type Props = {
    children: ReactNode;
}

const WalletContextProvider = ({ children }: Props) => {
    const solNetwork = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new CloverWalletAdapter(),
            new CoinbaseWalletAdapter(),
            new SolflareWalletAdapter(),
            new SafePalWalletAdapter(),
            new AvanaWalletAdapter(),
            new CoinhubWalletAdapter(),
            new NekoWalletAdapter() 
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [solNetwork]
    );

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

export default WalletContextProvider;