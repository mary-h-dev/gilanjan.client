import { create } from "zustand";
import {LoginModalStore} from "../../types/index"

const useLoginModal = create<LoginModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}));

export default useLoginModal;