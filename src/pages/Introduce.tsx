import clickedStore from "../stores/MenuClickedStore";
import Overlay from "../components/Overlay";
import { useEffect } from "react";
import Header from "../components/Header";

function Introduce() {
    const isClicked = clickedStore((state) => state.isClicked);
    const setIsClicked = clickedStore((state) => state.setIsClicked);
    useEffect(() => {
        setIsClicked(false);
    }, [])

    return (
        <>
            {
                isClicked? <Overlay style={{zIndex: 2000}}/> : null
            }
            <Header style={{zIndex: 1000}}/>
            <div style={{width: '100%', minHeight: '100%', backgroundImage: 'url(/background.svg)', marginTop: 57, overflowY: 'scroll', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{width: 304, minHeight: 324, marginTop: 94, position: 'relative', boxSizing: 'border-box'}}>
                    <div style={{writingMode: 'vertical-rl', padding: 8, color: '#8E4D2C', backgroundColor: '#F5CD8A', fontSize: 20, fontWeight: 500, position: 'absolute', bottom: 0, zIndex: 2, display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <span style={{letterSpacing: 8, marginTop: -16}}>레퓨즈  브랜드  스토리</span>
                    </div>
                    <div style={{backgroundImage: 'url(intro_1.svg)', width: 277, height: 247, borderRadius: 30, position: 'absolute', left: 27}} />
                    <img src='/logo.svg' width={177} height={137} style={{position: 'absolute', top: 187, left: 127}}/>
                </div>
                <div style={{width: 327, height: 317, position: 'relative', marginTop: 23}}>
                    <div style={{backgroundColor: '#313131', padding: 8, color: '#DEDEDE', fontSize: 14, fontWeight: 500, display: 'inline-block', position: 'absolute', left: 16, zIndex: 2}}>시간은 흘러도, 온기는 머물러 있습니다.</div>
                    <div style={{backgroundImage: 'url(/intro_2.svg)', width: 231, height: 288, borderRadius: 50, position: 'absolute', right: 0}}></div>
                    <div style={{padding: '8px 16px', backgroundColor: '#313131', color: '#FFFFFF', fontWeight: 100, fontSize: 12, fontFamily: 'SpokaHanSansNeo', position: 'absolute', bottom: 0}}>
                        <p>불은 원재료를 새로운 가치로 바꾸는 힘이자, 더 나은 것을 만들기 위해 오랜 시간 이어져 온 열정과 장인정신을 상징합니다.</p>
                        <br />
                        <p>REFUGE는 수원 공방거리 장인들이 쇠를 달구고, 나무를 다듬고, 유리를 녹이며 쌓아온 기술과 태도에 주목하며, 그들이 만들어 온 오래 지속되는 가치와 이야기를 전합니다.</p>
                    </div>
                </div>
                <div style={{width: 327, height: 334, position: 'relative', marginTop: 76}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="126" height="29" viewBox="0 0 126 29" fill="none" style={{position: 'relative', zIndex: 2, top: 0, left: 0}}>
                        <ellipse cx="63" cy="14.5" rx="63" ry="14.5" fill="#F5CD8A" />
                    </svg>
                    <div style={{width: 242, height: 303, backgroundImage: 'url(/intro_3.svg)', borderRadius: 50, position: 'absolute', top: 0}}/>
                    <div style={{padding: '8px 16px', color: '#FFFFFF', backgroundColor: '#313131', fontWeight: 100, fontSize: 12, fontFamily: 'SpokaHanSansNeo', position: 'absolute', bottom: 0}}>
                        <p>공방의 불이 재료를 바꾸듯, 로스팅의 불도 생두를 원두로 완성합니다. 재료는 다르지만 시간과 정성으로 가치를 만든다는 점은 같습니다.</p>
                        <br />
                        <p>REFUGE는 불과 시간이 남긴 흔적을 공간에 담아 공방거리의 이야기를 현대적으로 표현합니다.</p>
                    </div>
                </div>
                <div style={{width: 327, height: 305, position: 'relative', marginTop: 76, marginBottom: 132}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="126" height="29" viewBox="0 0 126 29" fill="none" style={{position: 'absolute', top: 0, right: 0, zIndex: 2}}>
                        <ellipse cx="63" cy="14.5" rx="63" ry="14.5" fill="#F5CD8A"/>
                    </svg>
                    <div style={{backgroundImage: 'url(/intro_4.svg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: 287, height: 265, borderRadius: 50, position: 'absolute', top: 14, right: 0}}/>
                    <div style={{color: '#FFFFFF', fontSize: 12, fontWeight: 100, fontFamily: 'SpokaHanSansNeo', padding: '8px 16px', backgroundColor: '#313131', position: 'absolute', bottom: 0}}>
                        <p>오늘도 공방거리의 불과 온기는 이어지고 있습니다. 장인들의 손끝에서 시작된 불은 기술과 작품이 되어 거리를 채워갑니다.</p>
                        <br />
                        <p>REFUGE는 그 불처럼 오래 이어지는 가치와 장인정신의 이야기를 전하는 공간입니다.</p>
                    </div>
                </div>
                <div style={{width: '100%', backgroundImage: 'url(/dark_background.svg)', padding: 8, color: '#E7D9C9', fontWeight: 500, fontSize: 10, fontFamily: 'SpokaHanSansNeo', textAlign: 'center', marginBottom: 90}}>경기도 수원시 팔달구 행궁로 41-1 카페 레퓨즈 (cafe REFUGE 1층)</div>
            </div>
        </>
    )
}

export default Introduce;