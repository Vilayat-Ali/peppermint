import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface NFT {
  tokenId: string;
  tokenAddress: string;
  imageUrl: string;
  name: string;
  price: number;
  description: string;
  tags: string[];
}

interface CartState {
  nfts: NFT[];
  total: number;
  addItem: (nft: NFT) => void;
  removeItem: (nft: NFT) => void;
}

const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        nfts: [],

        total: 0,

        addItem: (nft) =>
          set((state) => ({
            nfts: [...state.nfts, nft],
            total: state.total + nft.price,
          })),

        removeItem: (nft) =>
          set((state) => ({
            nfts: state.nfts.filter((item) => item === nft),
            total: state.total - nft.price,
          })),
      }),
      {
        name: "cart-storage",
      }
    )
  )
);

export default useCartStore;
