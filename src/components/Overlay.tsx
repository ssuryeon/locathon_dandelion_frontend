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
    background-image: url(/menu_detail_background.svg);
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
    font-size: 20px;
    &:nth-of-type(5) {
        margin-bottom: 0;
    }
`;

function Overlay() {
    const setIsClicked = clickedStore((state) => state.setIsClicked);
    const navigate = useNavigate();

    return (
        <BlurContainer>
            <img src='/back_icon.svg' onClick={() => setIsClicked(false)} style={{marginTop: 32}}/>
            <Modal>
                <div style={{height: 48}}/>
                <MenuBtn onClick={() => navigate('/')}>홈</MenuBtn>
                <MenuBtn onClick={() => navigate('/menu')}>메뉴판</MenuBtn>
                <MenuBtn>브랜드 소개</MenuBtn>
                <MenuBtn>나와 어울리는 커피 찾기</MenuBtn>
                <MenuBtn onClick={() => navigate('/map')}>공방거리 걷기</MenuBtn>
            </Modal>
        </BlurContainer>
    );
}

export default Overlay;