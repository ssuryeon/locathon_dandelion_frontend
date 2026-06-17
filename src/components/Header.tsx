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
    position: absolute;
    top: 0;
`;

function Header() {
    const setIsClicked = clickedStore((state) => state.setIsClicked);

    return (
        <Container>
            <img src='/text_logo.svg' />
            <img src='/menu_icon.svg' onClick={() => setIsClicked(true)}/>
        </Container>
    );
}

export default Header;