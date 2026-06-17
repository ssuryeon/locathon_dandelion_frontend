import { useEffect } from "react";
import clickedStore from "../stores/MenuClickedStore";
import Header from "../components/Header";
import Overlay from "../components/Overlay";


function GiftPage() {
    const isClicked = clickedStore((state) => state.isClicked);
    const setIsClicked = clickedStore((state) => state.setIsClicked);
    useEffect(() => {
        setIsClicked(false);
    }, [])

    return (
        <>
            {
                isClicked? <Overlay /> : null
            }
            <Header />
            <div style={{width: '100%', height: '100%', marginTop: 57, backgroundImage: 'url(/background.svg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingBottom: 54}}>
                <span style={{fontWeight: 700, fontSize: 20, color: '#DEDEDE', marginBottom: 22}}>선물 받기</span>
                <span style={{fontWeight: 500, fontSize: 14, color: '#DEDEDE', marginBottom: 31}}>가지고 싶은 레퓨즈의 선물을 골라보세요 !</span>
                <div style={{backgroundImage: 'url(/gift_background.svg)', backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', width: 275, height: 275, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 44, position: 'relative'}}>
                    <img src='/gift1.svg' width={167} height={214} style={{position: 'absolute', top: 11}}/>
                    <span style={{fontWeight: 500, fontSize: 13.89, color: '#DEDEDE', position: 'absolute', bottom: 34}}>드립백 패키지</span>
                </div>
                <div style={{backgroundImage: 'url(/gift_background.svg)', backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', width: 275, height: 275, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
                    <img src='/gift2.svg' width={214} height={192} style={{position: 'absolute', top: 35}}/>
                    <span style={{fontWeight: 500, fontSize: 13.89, color: '#DEDEDE', position: 'absolute', bottom: 27}}>레퓨즈 센서리 컵</span>
                </div>
            </div>
        </>
    );
}

export default GiftPage;