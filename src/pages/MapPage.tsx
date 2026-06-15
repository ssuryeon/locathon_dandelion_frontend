import styled from "styled-components";
import Header from "../components/Header";
import Overlay from "../components/Overlay";
import clickedStore from "../stores/MenuClickedStore";
import { useEffect } from "react";

const Button = styled.button`
    width: 199px;
    padding: 15px;
    border: none;
    background-color: #868686;
    .active {
        background-color: #F47C48;
    }
`;

function MapPage() {
    const isClicked = clickedStore((state) => state.isClicked);
    const setIsClicked = clickedStore((state) => state.setIsClicked);

    useEffect(() => setIsClicked(false), []);

    return (
        <div style={{width: '100%', height: '100%', backgroundImage: 'url(/background.svg)', overflowY: 'scroll'}}>
            {
                isClicked? <Overlay /> : null
            }
            <Header /> 
            <div style={{paddingTop: 57, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'scroll', textAlign: 'center'}}>
                <span style={{marginTop: 44, color: '#DEDEDE', fontWeight: 700, fontSize: 20}}>공방거리 걷기</span>
                <span style={{color: '#DEDEDE', fontWeight: 500, fontSize: 14, marginTop: 22}}>공방거리를 걸으며 불을 밝히고 레퓨즈의 선물을 받으세요 !</span>
                <img src='/map.svg' style={{marginTop: 43}}/>
                <div style={{backgroundImage: 'url(/stamp_background.svg)', backgroundSize: 'cover', width: '100%', height: 163.53, marginTop: 61, padding: '22.45px 19.05px', boxSizing: 'border-box'}}>
                    <span style={{marginTop: 22.45, display: 'inline-block', color: '#DEDEDE', fontSize: 13.89, fontWeight: 500}}>불꽃 스탬프</span>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', boxSizing: 'border-box', marginTop: 14.63}}>
                        <img src='/stamp.svg' />
                        <img src='/stamp.svg' />
                        <img src='/stamp.svg' />
                        <img src='/stamp.svg' />
                        <img src='/stamp.svg' />
                    </div>
                </div>
                <Button style={{marginTop: 46.47, fontSize: 20, fontWeight: 500, color: 'white'}}>선물 받기</Button>
            </div>
        </div>
    );
}

export default MapPage;