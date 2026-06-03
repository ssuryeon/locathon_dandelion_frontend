import {create} from 'zustand';

interface MenuClickedState {
    isClicked: boolean;
    setIsClicked: (arg0: boolean) => void;
}

const clickedStore = create<MenuClickedState>((set) => ({
    isClicked: false,
    setIsClicked: (c:boolean) => 
        set(() => ({
            isClicked: c
        }))
}))

export default clickedStore;