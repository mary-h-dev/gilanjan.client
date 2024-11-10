// hooks/useAuthStore.ts

import { create } from 'zustand';
import {AuthStore} from "../../types/index"

const useAuthStore = create<AuthStore>((set) => ({
    isLoggedIn: false,
    setLoggedIn: (value) => set({ isLoggedIn: value }),
}));

export default useAuthStore;
