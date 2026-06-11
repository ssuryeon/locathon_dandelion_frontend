import { AnswerBtn } from "../../components/AnswerBtn";
import { ContentContainer } from "../../components/ContentContainer";
import { useNavigate } from "react-router";

function Content6() {
    const navigate = useNavigate();
    const onClick = () => navigate('/recommend/result');

    return (
        <ContentContainer style={{alignItems: 'center'}}>
            <img src='/question_images/q6_image.svg' width={349} height={233} style={{marginTop: 92}} />
            <span style={{fontSize: 15, fontWeight: 700, color: '#DEDEDE', marginTop: 44, marginBottom: 57}}>Q6. 당신에게 가장 좋은 불의 모습은?</span>
            <AnswerBtn onClick={onClick}>무언가를 시작하게 만드는 첫 불씨</AnswerBtn>
            <AnswerBtn onClick={onClick}>오래도록 꺼지지 않고 이어가는 불빛</AnswerBtn>
            <AnswerBtn onClick={onClick}>사람들을 모이게 하는 따뜻한 모닥불</AnswerBtn>
            <AnswerBtn style={{marginBottom: 0}} onClick={onClick}>혼자만의 시간을 밝혀주는 작은 등불</AnswerBtn>
            <span style={{marginTop: 37, color: '#F5CD8A', fontSize: 12, fontWeight: 700}}>6/6</span>
        </ContentContainer>
    )
}

export default Content6;