import { UserData } from '@/interfaces/UserData';
import { create } from 'zustand';

interface UserDataStore extends UserData {
    setUserData: (data: UserData ) => void
    logout: () => void
    setStoreId: ( storeId: number ) => void
}

export const useUserData = create<UserDataStore>()( (set, get) => ({
    setUserData: (data: UserData ) => set(data),
    logout: ()=> set({ email: null, refreshToken: null, token: null, username: null }),
    setStoreId: (storeId: number) => set({ ...get(), selectedStoreId: storeId  })
}));