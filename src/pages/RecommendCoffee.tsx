import { Outlet } from 'react-router';
import Header from '../components/Header';
import Overlay from '../components/Overlay';
import { useEffect } from 'react';
import clickedStore from "../stores/MenuClickedStore";

function RecommendCoffee() {
    const setIsClicked = clickedStore((state) => state.setIsClicked);
    const isClicked = clickedStore((state) => state.isClicked);
    useEffect(() => setIsClicked(false), []);

    return (
        <div style={{width: '100%', height: '100%', backgroundImage: 'url(/background.svg)', backgroundRepeat: 'repeat', display: 'flex', flexDirection: 'column', position: 'relative', overflowY: 'scroll'}}>
            {
                isClicked? <Overlay style={{zIndex: 1000}}/> : null
            }
            <Header />
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'calc(100% - 57px)', marginTop: 57}}>
                <Outlet />
            </div>
        </div>
    );
}

export default RecommendCoffee;