import clickedStore from "../stores/MenuClickedStore";
import { useEffect } from "react";
import { useParams } from "react-router";
import Overlay from "../components/Overlay";
import Header from "../components/Header";
import styled from "styled-components";

const R1 = styled.div`
    background-color: black;
    flex: 6;
    max-width: 180px;
    height: 100%;
    box-sizing: border-box;
    aspect-ratio: 15/22;
    margin-right: clamp(0px, calc(100vw - 374px), 28px);
`;

const R2 = styled.div`
    width: 100%;
    height: 100px;
    background-color: black;
    margin-bottom: 12px;
`;

const R3 = styled.div`
    width: 150px;
    height: 56px;
    background-color: black;
`;

const C1 = styled.div`
    width: 101px;
    height: 101px;
    border-radius: 50%;
    background-color: black;
`;

const C2 = styled.div`
    width: 78px;
    flex: 1;
    background-color: transparent;
    margin-top: 29px;
`;

const R4 = styled.div`
    width: 56px;
    height: 100%;
    background-color: black;
    margin-left: 24px;
`;

const C3 = styled.div`
    width: 150px;
    height: 151px;
    border-radius: 50%;
    background-color: black;
    box-sizing: border-box;
    flex-shrink: 0;
`;

const mockMenus = {
    'ConPanna': {
        detail_name: 'Conpanna', 
        desc: '진한 에스프레소와 곁들여 먹는 시그니처 크림!', 
        eng_desc: 'Signature cream with strong espresso!', 
        price: '5,500'
    },
    'Refugesspanner': {
        detail_name: 'Refuge panner', 
        desc: '달콤하고 부드러운 레퓨즈만의 특별한 크림이 올라간 아인슈페너', 
        eng_desc: 'A signature Einspänner topped with Refuse’s sweet and velvety special cream.', 
        price: '7,000'
    },
    'Americano': {
        detail_name: 'Americano', 
        desc: '깊은 향과 깔끔한 끝맛이 매력적인 클래식 커피', 
        eng_desc: 'Classic coffee with a deep scent and a clean finish.', 
        price: '5,000'
    },
    'Raspberry ade': {
        detail_name: 'Raspberry ade', 
        desc: '라즈베리 베이스의 레퓨즈 수제 베리청이 들어간 상콤달콤한 에이드', 
        eng_desc: 'A sweet and sour ade with raspberry-based Refuse handmade berry syrup', 
        price: '6,500'
    },
    'Handmade real tiramisu': {
        detail_name: 'Handmade Real Tiramisu', 
        desc: '레이디스핑거, 에스프레소, 수제크림으로 이탈리아 현지 스타일을 구현한 티라미수입니다.', 
        eng_desc: 'It is a tiramisu that embodies the local Italian style with lady\'s finger, espresso, and handmade cream.', 
        price: '8,000'
    }
}

function MenuDetail() {
    const isClicked = clickedStore((state) => state.isClicked);
    const setIsClicked = clickedStore((state) => state.setIsClicked);
    const params = useParams();
    const name = params.name;
    const menu = name ? mockMenus[name as keyof typeof mockMenus] : undefined;

    useEffect(() => setIsClicked(false), []);

    return (
        <div style={{backgroundImage: 'url(/background.svg)', width: '100%', minHeight: '100%'}}>
            {
                isClicked? <Overlay /> : null
            }
            <Header />
            <div style={{width: '100%', height: '100%', overflowY: 'scroll', paddingLeft: 20, paddingRight: 24, marginTop: 57, boxSizing: 'border-box'}}>
                <div style={{width: '100%', height: 264, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 45}}>
                    <R1 style={{backgroundImage:`url("/${name}/R1.svg")`}}/>
                    <div style={{width: 150, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box'}}>
                        <div style={{width: '100%'}}>
                            <R2 style={{backgroundImage: `url("/${name}/R2.svg")`}}/>
                            <span style={{fontSize: 16, color: '#E7D9C9', fontWeight: 400, fontFamily: 'SpokaHanSansNeo'}}>{menu?.detail_name}</span>
                        </div>
                        <div style={{width: '100%'}}>
                            <span style={{fontSize: 10, fontWeight: 300, fontFamily: 'SpokaHanSansNeo', color: '#E7D9C9', lineHeight: '1.2', display: 'inline-block', marginBottom: 5}}>{menu?.desc}</span>
                            <R3 style={{backgroundImage: `url("/${name}/R3.svg")`}}/>
                        </div>
                    </div>
                </div>
                <div style={{width: '100%', height: 341, display: 'flex', flexDirection: 'row', marginTop: 29, justifyContent: 'space-between'}}>
                    <div style={{width: 101, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <C1 style={{backgroundImage: `url("/${name}/C1.svg")`}}/>
                        <C2 style={{backgroundImage: `url("/${name}/C2.svg")`}}/>
                    </div>
                    <R4 style={{backgroundImage: `url("/${name}/R4.svg")`}}/>
                    <div style={{display: 'flex', width: 157, height: 341, flexDirection: 'column', justifyContent: 'space-between', marginLeft: 31, boxSizing: 'border-box'}}>
                        <C3 style={{backgroundImage: `url("/${name}/C3.svg")`}}/>
                        <div style={{display: 'flex', height: 100, flexDirection: 'column', justifyContent: 'flex-end', boxSizing: 'border-box', overflow: 'hidden'}}>
                            <span style={{fontSize: 10, color: "#E7D9C9", fontWeight: 300, fontFamily: "SpokaHanSansNeo", lineHeight: "1.2", display: 'inline-block'}}>{menu?.eng_desc}</span>
                            <span style={{color: "#E7D9C9", fontSize: 43, fontWeight: 700, fontFamily: "SpokaHanSansNeo", display: 'inline-block', height: 50, lineHeight: '50px'}}>{menu?.price}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{height: 105}}/>
        </div>
    );
}

export default MenuDetail;