import styled from "styled-components";
import {useEffect, useState} from 'react';
import { useNavigate } from "react-router";
import Header from '../components/Header';
import Overlay from "../components/Overlay";
import clickedStore from "../stores/MenuClickedStore";

const Container = styled.div`
    background-image: url(/background.svg);
    background-repeat: repeat;
    width: 100%; 
    min-height: 100vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column; 
    align-items: center;
    position: relative;
    // padding: 20px;
    padding-bottom: 0;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const TextArea = styled.span`
    color: #FFFDEC;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.72px;
`;

const Button = styled.button`
    border: none;
    border-radius: 10.34px;
    background-color: #474848;
    color: #FFFDEC;
    border: 1px solid #DFDFDF;
    font-weight : 400;
    font-size: 14px;
    font-weight: 200;
    width: 100%;
    padding: 13.5px;
`;

const MenuContainer = styled.div`
    width: 114px;
    height: 152px;
    flex-shrink: 0;
    background-color: #474848;
    border: 1px solid #DFDFDF;
    border-radius: 10.34px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    box-sizing: border-box;
    &:nth-of-type(8) {
        margin-right: 0;
    }
`;

const ScrollContainer = styled.div`
    width: 100%;
    height: 168px;
    overflow-x: auto;
    overflow-y: hidden;
    touch-action: pan-x;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const menus = [
  '크림 레퓨즈',
  '콘파냐',
  '코르타도',
  '레퓨즈 페너',
  '아메리카노',
  '카페라떼',
  '카푸치노',
  '바닐라 라떼',
  '아몬드 헤이즐넛',
  '카페모카',
  '에스프레소',
  '아포카토',
  '라즈베리콕',
  '라즈베리 차',
  '라즈베리 에이드',
  '초코라떼',
  '허브 차',
  '잔 와인',
  '하이네켄',
  '기네스',
  '버번 콕 플로트',
  '뱅쇼',
  '라즈베리 하이볼',
  '위스키 리타',
  '아이리쉬 커피 하이볼',
  '수제 리얼 티라미수',
  '초콜릿 & 바게트',
  '바닐라 베리 젤라토',
  '판나코타'
]

interface ILine {
    style?: object,
}

function LineIcon({style}:ILine) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="338" height="3" viewBox="0 0 338 3" fill="none" style={style}>
            <path d="M2.5 1.19336L1.69895e-07 -1.63317e-05L-8.24727e-08 2.88674L2.5 1.69336L2.5 1.19336ZM335.5 1.69339L338 2.88676L338 1.32172e-05L335.5 1.19339L335.5 1.69339ZM2.25 1.44336L2.25 1.69336L335.75 1.69339L335.75 1.44339L335.75 1.19339L2.25 1.19336L2.25 1.44336Z" fill="#FFFDEC"/>
        </svg>
    );
}

function Main() {
    const [selected, setSelected] = useState<number[]>([]);
    const navigate = useNavigate();
    const isClicked = clickedStore((state) => state.isClicked);
    const setIsClicked = clickedStore((state) => state.setIsClicked);

    useEffect(() => {
        setIsClicked(false);
        let cnt = 0;
        const nums:number[] = [];
        while(cnt <= 7) {
            const rand = Math.floor(Math.random()*12);
            if(nums.includes(rand)) continue;
            cnt += 1;
            nums.push(rand);
        }
        setSelected(nums);
        console.log(nums);
    }, []);

    return (
        <>
            {
                isClicked? <Overlay /> : null
            }
            <Container>
                <Header />
                <img src='/logo.svg' style={{marginTop: 30, marginBottom: 20}}/>
                <div style={{display: 'flex', flexDirection: 'column', marginBottom: 148}}>
                    <TextArea><span style={{fontWeight: 700}}>cafe REFUGE</span> is a</TextArea>
                    <TextArea style={{fontWeight: 700}}>workshop street</TextArea>
                    <TextArea>roasting cafe.</TextArea>
                    <TextArea style={{fontSize: 13, marginTop: 8}}>카페 레퓨즈는 공방거리 로스터리 카페입니다</TextArea>
                </div>
                <LineIcon />
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 9, marginBottom: 17}}>
                    <span style={{color: '#FFFDEC', fontSize: 13, marginBottom: 15, fontWeight: 200, fontFamily: 'SpokaHanSansNeo'}}>공방거리를 걸으며 꺼져가는 불씨를 살려 선물을 받으세요!</span>
                    <img src='/fire_icon.svg' style={{marginBottom: 24}}/>
                    <Button onClick={() => navigate('/map')} style={{marginBottom: 24}}>공방거리 걷기</Button>
                    <Button>나와 어울리는 커피 찾기</Button>
                </div>
                <LineIcon style={{marginBottom: 124}}/>
                <span style={{fontSize: 15, fontWeight: 600, color: '#FFFDEC'}}>추천 메뉴</span>
                <LineIcon style={{marginBottom: 7}}/>
                    {
                        selected.length && (
                            <ScrollContainer>
                                {selected.map((num, idx) => (
                                    <MenuContainer key={idx}>
                                        <img src={`/${menus[num]}.svg`} width={90} height={120} />
                                    </MenuContainer>
                                ))}
                            </ScrollContainer>
                        )
                    }
                <LineIcon style={{marginTop: 7}}/>
                <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 207}}>
                    <span style={{fontWeight: 200, fontFamily: 'SpokaHanSansNeo', fontSize: 13, color: '#FFFDEC', marginBottom: 5}}>scroll to menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="18" viewBox="0 0 6 18" fill="none">
                        <path d="M2.88672 17.8868L5.77347 15L2.88672 12.1132L-3.20077e-05 15L2.88672 17.8868ZM2.88672 0L2.38672 2.18557e-08L2.38672 15L2.88672 15L3.38672 15L3.38672 -2.18557e-08L2.88672 0Z" fill="white"/>
                    </svg>
                    <div style={{height: 30, width: '100%', textAlign: 'center', fontWeight: 400, fontSize: 10, fontFamily: 'SpokaHanSansNeo', color: '#E7D9C9', background: 'url(/dark_background.svg)', marginTop: 21, marginBottom: 90}}>경기도 수원시 팔달구 행궁로 41-1 카페 레퓨즈 (cafe REFUGE 1층)</div>
                </div>
            </Container>
        </>
    );
}

export default Main;