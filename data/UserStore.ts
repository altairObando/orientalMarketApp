import { UserData } from '@/interfaces/UserData';
import { create } from 'zustand';

interface UserDataStore extends UserData{
    setUserData: (data: UserData ) => void
    logout: () => void
}

export const useUserData = create<UserDataStore>()( set => ({
    setUserData: (data: UserData ) => set(data),
    logout: ()=> set({ email: null, refreshToken: null, token: null, username: null })
}))