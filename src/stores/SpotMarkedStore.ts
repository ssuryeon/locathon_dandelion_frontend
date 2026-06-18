import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SpotMarkedState {
    marked: boolean[];
    markSpot: (index: number) => void;
    reset: () => void;
}

const spotMarkedStore = create<SpotMarkedState>()(
    persist(
        (set) => ({
            marked: [false, false, false, false, false],
            markSpot: (index: number) =>
                set((state) => {
                    if (state.marked[index]) return state;
                    const next = [...state.marked];
                    next[index] = true;
                    return { marked: next };
                }),
            reset: () => set({ marked: [false, false, false, false, false] }),
        }),
        { name: 'spot-marked' }
    )
);

export default spotMarkedStore;
