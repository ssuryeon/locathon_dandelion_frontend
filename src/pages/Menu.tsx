import styled from "styled-components";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import clickedStore from "../stores/MenuClickedStore";
import MenuContent from "../components/MenuContent";
import Overlay from "../components/Overlay";

const Container = styled.div`
    font-family: 'SpokaHanSansNeo';
    width: 100%;
    min-height: 100vh;
    overflow-y: scroll;
    background-image: url(/background.svg);
    background-repeat: repeat;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 32px;
    box-sizing: border-box;
    position: relative;
`;

const CategoryBtn = styled.button`
    font-family: 'SpokaHanSansNeo';
    padding: 10px 25px;
    border-radius: 10.34px;
    margin-right: 17px;
    font-size: 12px;
    border: 1px solid #DFDFDF;
    font-weight: normal;
`;

const menus = {
    signiture: [
        {name: '크림 레퓨즈', eng_name: 'Cream refuge'},
        {name: '콘파냐', eng_name: 'ConPanna'},
        {name: '코르타도', eng_name: 'Cortado'},
        {name: '레퓨즈 페너', eng_name: 'Refugesspanner'},
    ],
    Coffee: [
        {name: '아메리카노', eng_name: 'Americano'},
        {name: '카페라떼', eng_name: 'Cafe Latte'},
        {name: '카푸치노', eng_name: 'Capuccino'},
        {name: '바닐라 라떼', eng_name: 'Vanilla Latte'},
        {name: '아몬드 헤이즐넛', eng_name: 'Almond Hazlenuts'},
        {name: '카페모카', eng_name: 'Cafe Mocha'},
        {name: '에스프레소', eng_name: 'Espresso'},
        {name: '아포카토', eng_name: 'Affogato'},
    ],
    None_Coffee: [
        {name: '라즈베리콕', eng_name: 'Raspberry coke'},
        {name: '라즈베리 차', eng_name: 'Raspberry tea'},
        {name: '라즈베리 에이드', eng_name: 'Raspberry ade'},
        {name: '초코라떼', eng_name: 'Chocolate latte'},
        {name: '허브 차', eng_name: 'Herb tea'},
    ],
    Wine: [
        {name: '잔 와인', eng_name: 'Glass wine'},
    ],
    Beer: [
        {name: '하이네켄', eng_name: 'Heineken'},
        {name: '기네스', eng_name: 'Guinness'},
    ],
    Cocktail: [
        {name: '버번 콕 플로트', eng_name: 'Bourbon coke float'},
        {name: '뱅쇼', eng_name: 'Vin chaud'},
        {name: '라즈베리 하이볼', eng_name: 'Raspberry highball'},
        {name: '위스키 리타', eng_name: 'Whiskey margarita'},
        {name: '아이리쉬 커피 하이볼', eng_name: 'Irish coffee highball'},
    ],
    Food: [
        {name: '수제 리얼 티라미수', eng_name: 'Handmade real tiramisu'},
        {name: '초콜릿 & 바게트', eng_name: 'Chocolate & Baguette'},
        {name: '바닐라 베리 젤라토', eng_name: 'Vanilla berry gelato'},
        {name: '판나코타', eng_name: 'Panna cotta'},
    ]
}

function Menu() {
    const [category, setCategory] = useState(1);
    const isClicked = clickedStore((state) => state.isClicked);
    const setIsClicked = clickedStore((state) => state.setIsClicked);

    useEffect(() => setIsClicked(false), []);
    
    return (
        <Container>
            {
                isClicked? <Overlay /> : null
            }
            <Header />
            <img src='/logo.svg' width={132} height={102}  style={{marginTop: 57, marginBottom: 34}}/>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                <CategoryBtn onClick={() => setCategory(1)} style={{backgroundColor: (category == 1) ? '#DFDFDF' : '#474848', color: (category == 1) ? '#474848' : '#FFFFFF'}}>커피</CategoryBtn>
                <CategoryBtn onClick={() => setCategory(2)} style={{backgroundColor: (category == 2) ? '#DFDFDF' : '#474848', color: (category == 2) ? '#474848' : '#FFFFFF'}}>논커피</CategoryBtn>
                <CategoryBtn onClick={() => setCategory(3)} style={{backgroundColor: (category == 3) ? '#DFDFDF' : '#474848', color: (category == 3) ? '#474848' : '#FFFFFF'}}>푸드</CategoryBtn>
            </div>
            <div style={{fontFamily: 'SpokaHanSansNeo', width: '100%'}}>
                {
                    category == 1 ? 
                        <div style={{width: '100%'}}>
                            <MenuContent title='시그니처' name='Signiture' menus={menus.signiture} style={{marginBottom: 79}}/>
                            <MenuContent title='커피' name='Coffee' menus={menus.Coffee}/>
                        </div> :
                        category == 2 ?
                            <div style={{width: '100%'}}>
                                <MenuContent title='커피 안들어간 논커피' name='None Coffee' menus={menus.None_Coffee} style={{marginBottom: 79}}/>
                                <MenuContent title='와인' name='Wine' menus={menus.Wine} style={{marginBottom: 79}}/>
                                <MenuContent title='맥주' name='Beer' menus={menus.Beer} style={{marginBottom: 79}}/>
                                <MenuContent title='칵테일' name='Cocktail' menus={menus.Cocktail}/>
                            </div> :
                            <div style={{width: '100%'}}>
                                <MenuContent title='먹을거리' name='Eat something' menus={menus.Food}/>
                            </div>
                }
            </div>
        </Container>
    );
}

export default Menu;