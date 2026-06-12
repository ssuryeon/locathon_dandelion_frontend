import clickedStore from "../stores/MenuClickedStore";
import { useEffect } from "react";
import Overlay from "../components/Overlay";
import Header from "../components/Header";

function MenuDetail() {
    const isClicked = clickedStore((state) => state.isClicked);
    const setIsClicked = clickedStore((state) => state.setIsClicked);

    useEffect(() => setIsClicked(false), []);

    return (
        <div style={{backgroundImage: 'url(/background.svg)', width: '100%', height: '100%', overflowY: 'scroll'}}>
            {
                isClicked? <Overlay /> : null
            }
            <Header />
            <div style={{width: '100%', height: '100%', overflowY: 'scroll', paddingLeft: 20, paddingRight: 24, marginTop: 57, boxSizing: 'border-box'}}>
                <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 45}}>
                    <div style={{backgroundColor: 'black', width: 180, height: 264, boxSizing: 'border-box'}} />
                    <div style={{width: 228, boxSizing: 'border-box'}}>
                        <div style={{width: '100%'}}>
                            <div style={{width: '100%', height: 135, backgroundColor: 'black'}}/>
                            <span style={{fontSize: 16, color: '#E7D9C9', fontWeight: 400, fontFamily: 'SpokaHanSansNeo'}}>Refuge panner</span>
                        </div>
                        <div>
                            <span style={{fontSize: 10, fontWeight: 200, fontFamily: 'SpokaHanSansNeo', color: '#E7D9C9'}}>달콤하고 부드러운 레퓨즈만의<br />특별한 크림이 올라간 아인슈페너</span>
                            <div style={{width: 150, height: 56, backgroundColor: 'black'}}/>
                        </div>
                    </div>
                </div>
                <div style={{width: '100%', display: 'flex', flexDirection: 'row', marginTop: 29}}>
                    <div>
                        <div style={{width: 101, height: 101, borderRadius: '50%', backgroundColor: 'black'}}/>
                        <div style={{width: 78, height: 195, backgroundColor: 'black', marginTop: 29}}/>
                    </div>
                    <div style={{width: 56, height: 341, backgroundColor: 'black'}}/>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginLeft: 31}}>
                        <div style={{width: 150, height: 151, borderRadius: '50%', backgroundColor: 'black'}}/>
                        <div style={{marginTop: 106}}>
                            <span style={{fontSize: 10, color: '#E7D9C9', fontWeight: 200, fontFamily: 'SpokaHanSansNeo'}}>A signature Einspänner topped with Refuse’s sweet and velvety special cream.</span>
                            <span style={{color: '#E7D9C9', fontSize: 43, fontWeight: 700, fontFamily: 'SpokaHanSansNeo'}}>7,000</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuDetail;