import styled from "styled-components";
import clickedStore from "../stores/MenuClickedStore";

const Container = styled.div`
    width: 100%;
    padding: 20px;
    height: 57px;
    background-image: url(/background.svg);
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
`;

function Header() {
    const setIsClicked = clickedStore((state) => state.setIsClicked);

    return (
        <Container>
            <img src='/text_logo.svg' style={{ maxHeight: '24px', width: 'auto' }} />
            <img src='/menu_icon.svg' onClick={() => setIsClicked(true)}/>
        </Container>
    );
}

export default Header;