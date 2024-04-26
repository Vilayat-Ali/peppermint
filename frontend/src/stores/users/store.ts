import { createStore } from 'zustand/vanilla'

export type UserState = {
  username: string,
  email: string,
  walletAddress: string,
}

export type UserActions = {
  login: (userData: UserState) => void,
  logout: () => void
}

export type UserStore = UserState & UserActions

export const defaultInitState: UserState = {
  username: '',
  email: '',
  walletAddress: '',
}

export const createUserStore = (
  initState: UserState = defaultInitState,
) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    login: (userData: UserState) => set((_state) => ({ ...userData })),
    logout: () => set((_state) => ({ username: '', email: '', walletAddress: '' })),
  }))
}