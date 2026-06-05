import styled from 'styled-components';

const Button = styled.button`
    width: 120px;
    height: 33px;
    border-radius: 10.34px;
    background-color: #474848;
    border: 1px solid #DFDFDF;
`

function Content0() {
    return(
        <div>
            <div>
                <span>나와 어울리는 커피 찾기</span>
                <img src='/search_coffee_0.svg' />
                <span>로스터리 장인이 당신과 어울리는 커피를 권하고자 합니다.</span>
            </div>
            <div>
                <Button>추천해주세요</Button>
                <Button>돌아가기</Button>
            </div>
        </div>
    );
}

export default Content0;