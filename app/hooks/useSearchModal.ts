import { create } from "zustand";
import {SearchQuery, SearchModalStore} from "../../types/index"



const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    step: '',
    open: (step) => set({ isOpen: true, step: step }),
    close: () => set({ isOpen: false }),
    setQuery: (query: SearchQuery) => set({query: query}),
    query: {
        country: '',
        checkIn: null,
        checkOut: null,
        guests: 1,
        bedrooms: 0,
        // bathrooms: 0,
        buildingsmeter: 0,
        floorareameters: 0,
        category: ''
    }
}));

export default useSearchModal;