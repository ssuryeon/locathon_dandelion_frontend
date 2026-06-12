import styled from "styled-components";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import clickedStore from "../stores/MenuClickedStore";
import MenuContent from "../components/MenuContent";
import Overlay from "../components/Overlay";
import { menus } from "../data/Menus";

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
    // padding: 32px;
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
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: 32, boxSizing: 'border-box'}}>
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
            <div style={{height: 30, width: '100%', textAlign: 'center', fontWeight: 400, fontSize: 10, fontFamily: 'SpokaHanSansNeo', color: '#E7D9C9', background: 'url(/dark_background.svg)', marginTop: 134, marginBottom: 82}}>경기도 수원시 팔달구 행궁로 41-1 카페 레퓨즈 (cafe REFUGE 1층)</div>
        </Container>
    );
}

export default Menu;