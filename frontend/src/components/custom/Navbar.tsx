'use client';

import React from 'react'
import WalletAdapterProvider from '@/web3/WalletAdapterProvider';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

type Props = {}

const Navbar = () => {
  return (
    <WalletAdapterProvider>
        <WalletMultiButton />
    </WalletAdapterProvider>
  )
}

export default Navbar