import { create } from "zustand";

interface IRecommend {
    score_x: number,
    score_y: number,
    setScoreX: (arg0:number) => void,
    setScoreY: (arg0:number) => void,
}

export const recommendStore = create<IRecommend>((set) => ({
    score_x: 0,
    score_y: 0,
    setScoreX: (plus:number) => set((state) => ({
        score_x: state.score_x + plus
    })),
    setScoreY: (plus:number) => set((state) => ({
        score_y: state.score_y + plus
    })) 
}))