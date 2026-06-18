import styled from "styled-components";
import Header from "../components/Header";
import Overlay from "../components/Overlay";
import clickedStore from "../stores/MenuClickedStore";
import { useEffect } from "react";
import { SelectBtn } from "../components/SelectBtn";
import { useState } from "react";
import { geoToMapPx } from '../lib/projectPos';
// 테스트 시: useMockGeolocation 으로 교체, 실제 배포 시: useGeolocation 으로 복원
import { useGeolocation } from "../hooks/useGeolocation";
// import { useMockGeolocation as useGeolocation } from "../hooks/useMockGeolocation";
import { haversineDistanceMeters } from '../lib/geo';
import spotMarkedStore from '../stores/SpotMarkedStore';
import { useNavigate } from "react-router";

const Button = styled.button`
    width: 120px;
    padding: 8px;
    border-radius: 10.34px;
    border: 1px solid #DFDFDF;
    background-color: #474848;
    color: #F5CD8A;
    &.active {
        background: linear-gradient(#FFDC8B, #F8BC84);
        color: #FFFDEC;
    }
`;

const Spot = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    box-shadow: 0 0 17.6px 0 #F47C48;
    background-color: white;
    border: 1px solid #FF6900;
    &.active {
        background-color: #FF8B58
    }
`;

const SpotPos = [
    {name: '경애공방', lon: 127.014690, lat: 37.280480},
    {name: '영화당', lon: 127.014976, lat: 37.279913},
    {name: '스튜디오 로티니', lon: 127.014911, lat: 37.279444},
    {name: '카페 레퓨즈', lon: 127.015264, lat: 37.278941},
    {name: '막걸리 계보', lon: 127.015766, lat: 37.278078},
]

interface ITutorial {
    set: any,
}

function Tutorial({set}:ITutorial) {
    return (
        <div style={{width: '100%', minHeight: '100vh', backgroundColor: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
            <img src='/stamp_activated.svg' width={107} height={107}/>
            <span style={{marginTop: 15, fontSize: 20, fontWeight: 700, color: '#DEDEDE'}}>REFUGE fire</span>
            <p style={{marginTop: 20, fontSize: 14, fontWeight: 700, color: '#DEDEDE'}}>불꽃을 찾아 돌아다녀보세요<br />5개의 불꽃을 밝히고 레퓨즈만의<br />맛있는 선물을 받으세요 !</p>
            <div style={{marginTop: 63, width: 137, height: 86, borderRadius: 15, backgroundImage: 'url(/tutorial_map.png)', backgroundSize: 'contain'}}></div>
            <span style={{marginTop: 20, fontSize: 20, fontWeight: 700, color: '#DEDEDE'}}>REFUGE map</span>
            <p style={{marginTop: 20, marginBottom: 62, fontSize: 14, fontWeight: 700, color: '#DEDEDE'}}>공방거리에서 고객님의 위치와<br />불꽃의 위치를 알려주어요 !</p>
            <SelectBtn onClick={() => set(false)} style={{color: '#F5CD8A', fontFamily: 'Daehan'}}>닫기</SelectBtn>
        </div>
    )
}

// interface ICurrentLoc {
//   status: 'idle' | 'requesting' | 'watching' | 'error'
//   position?: { lat: number, lng: number }  // 위도/경도 여기
//   accuracyM?: number
//   error?: string
//   updatedAtMs?: number
// }

function MapPage() {
    const isClicked = clickedStore((state) => state.isClicked);
    const setIsClicked = clickedStore((state) => state.setIsClicked);
    const marked = spotMarkedStore((state) => state.marked);
    const markSpot = spotMarkedStore((state) => state.markSpot);
    const [showTutorial, setShowTutorial] = useState(true);
    // const location = useGeolocation(!showTutorial);
    const location = useGeolocation();
    const navigate = useNavigate();
    const btnActive = marked.filter((m) => m).length === 5;
    const onClick = () => {
        if(btnActive) {
            navigate('/map/gift');
        }
        else alert('공방거리 스팟을 더 채워주세요.');
    }

    useEffect(() => {
;        setIsClicked(false);
    }, []);
    useEffect(() => {
        if (location.position == null) return;
        SpotPos.forEach((spot, i) => {
            const distance = haversineDistanceMeters(location.position!, {lat: spot.lat, lng: spot.lon});
            if (distance <= 30) markSpot(i);
        });
    }, [location.position?.lat, location.position?.lng])

    return (
        <>
            {showTutorial? <Tutorial set={setShowTutorial}/> : (
                <div style={{width: '100%', height: '100%', backgroundImage: 'url(/background.svg)', overflowY: 'scroll'}}>
                {
                    isClicked? <Overlay /> : null
                }
                <Header /> 
                <div style={{paddingTop: 57, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'scroll', textAlign: 'center'}}>
                    <span style={{marginTop: 44, color: '#DEDEDE', fontWeight: 700, fontSize: 20}}>공방거리 걷기</span>
                    <span style={{color: '#DEDEDE', fontWeight: 500, fontSize: 14, marginTop: 22}}>공방거리를 걸으며 불을 밝히고 레퓨즈의 선물을 받으세요 !</span>
                    <div style={{marginTop: 43, backgroundImage: 'url(/map.svg)', backgroundSize: 'cover', width: 402, height: 253, position: 'relative'}}>
                        {SpotPos.map((s, idx) => {
                            const pos = geoToMapPx({
                                containerWidthPx: 402,
                                containerHeightPx: 253,
                                target: { lat: s.lat, lng: s.lon }
                            });
                            return <Spot key={idx} style={{ position: 'absolute', top: pos.y - 9, left: pos.x - 9 }} className={marked[idx] ? 'active' : 'inactive'}/>
                        })}
                    </div>
                    <div style={{backgroundImage: 'url(/stamp_background.svg)', backgroundSize: 'cover', width: '100%', height: 163.53, marginTop: 61, padding: '22.45px 19.05px', boxSizing: 'border-box'}}>
                        <span style={{marginTop: 22.45, display: 'inline-block', color: '#DEDEDE', fontSize: 13.89, fontWeight: 500}}>불꽃 스탬프</span>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', boxSizing: 'border-box', marginTop: 14.63}}>
                            {
                                [0, 1, 2, 3, 4].map((i) => <img src={i < marked.filter((m) => m).length ? '/stamp_activated.svg' : '/stamp.svg'} key={i} />)
                            }
                        </div>
                    </div>
                        <Button style={{marginTop: 46.47, fontSize: 15, fontWeight: 700}} onClick={onClick} className={btnActive? 'active' : 'inactive'}>선물 받기</Button>
                    </div>
                </div>
            )}
        </>
    );
}

export default MapPage;