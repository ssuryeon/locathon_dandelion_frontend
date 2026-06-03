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
    /* justify-content: center; */
    align-items: center;
    position: relative;
    padding: 20px;
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
    border-radius: 8px;
    background-color: #F5CD8A;
    color: #8E4D2C;
    font-weight : 400;
    font-size: 14px;
    width: 100%;
    padding: 15px;
    margin-top: 30px;
`;

const MenuContainer = styled.div`
    width: 114px;
    height: 152px;
    background-color: #474848;
    border: 1px solid #DFDFDF;
    border-radius: 10.34px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    &:nth-of-type(8) {
        margin-right: 0;
    }
`;

const ScrollContainer = styled.div`
    width: 100%;
    height: 162px;
    overflow-x: auto;
    overflow-y: hidden;
    touch-action: pan-x;
    justify-content: center;
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
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <TextArea><span style={{fontWeight: 700}}>cafe REFUGE</span> is a</TextArea>
                    <TextArea style={{fontWeight: 700}}>workshop street</TextArea>
                    <TextArea>roasting cafe.</TextArea>
                    <TextArea style={{fontSize: 13, marginTop: 8}}>카페 레퓨즈는 공방거리 로스터리 카페입니다</TextArea>
                </div>
                <Button onClick={() => navigate('/map')}>공방거리 걷기</Button>
                {
                    selected.length && (
                        <ScrollContainer style={{display: 'flex', flexDirection: 'row', marginTop: 40}}>
                            {selected.map((num, idx) => (
                                <MenuContainer key={idx}>
                                    <img src={`/${menus[num]}.svg`} width={90} height={120} />
                                </MenuContainer>
                            ))}
                        </ScrollContainer>
                    )
                }
            </Container>
        </>
    );
}

export default Main;