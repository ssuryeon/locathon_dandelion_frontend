import styled from "styled-components";
import clickedStore from "../stores/MenuClickedStore";
import { useNavigate } from "react-router";

const BlurContainer = styled.div`
    position: fixed;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(5px);
    inset: 0;
    z-index: 2;
    padding: 28px;
    box-sizing: border-box;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Modal = styled.div`
    width: 100%;
    height: 633px;
    background-image: url(/background.svg);
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 20px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    padding: 22px;
    box-sizing: border-box;
    bottom: 77px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const MenuBtn = styled.button`
    width: 100%;
    height: 65px;
    background-color: #474848;
    border: 1px solid #DFDFDF;
    border-radius: 10.34px;
    color: #FFFDEC;
    margin-bottom: 40px;
    font-size: 14px;
    &:nth-of-type(5) {
        margin-bottom: 0;
    }
`;

const Header = styled.div`
    width: 100%;
    height: 57px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0;
`;

function Overlay() {
    const setIsClicked = clickedStore((state) => state.setIsClicked);
    const navigate = useNavigate();

    return (
        <BlurContainer>
            <Header>
                <img src='/text_logo.svg' width={78} height={21}/>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 23" fill="none" onClick={() => setIsClicked(false)}>
                    <path d="M5.0719 18.8491L19.9211 3.99988" stroke="#E4E4E4" stroke-width="2" stroke-linecap="round"/>
                    <path d="M19.8492 18.8491L5 3.99988" stroke="#E4E4E4" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </Header>
            <Modal>
                <img src='/logo.svg' width={132} height={102} style={{marginBottom: 28}}/>
                <MenuBtn onClick={() => navigate('/')}>홈</MenuBtn>
                <MenuBtn onClick={() => navigate('/menu')}>메뉴판</MenuBtn>
                <MenuBtn>브랜드 소개</MenuBtn>
                <MenuBtn onClick={() => navigate('/recommend')}>나와 어울리는 커피 찾기</MenuBtn>
                <MenuBtn onClick={() => navigate('/map')}>공방거리 걷기</MenuBtn>
            </Modal>
        </BlurContainer>
    );
}

export default Overlay;