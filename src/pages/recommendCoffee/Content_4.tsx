import { AnswerBtn } from "../../components/AnswerBtn";
import { ContentContainer } from "../../components/ContentContainer";
import { useNavigate } from "react-router";

function Content4() {
    const navigate = useNavigate();
    const onClick = () => navigate('/recommend/five');

    return (
        <ContentContainer style={{alignItems: 'center'}}>
            <img src='/question_images/q4_image.svg' width={276} height={276} style={{marginTop: 60}} />
            <span style={{fontSize: 15, fontWeight: 700, color: '#DEDEDE', marginTop: 59, marginBottom: 37}}>Q4. 커피 한 잔을 마신 뒤 가장 중요하게 남는 것은?</span>
            <AnswerBtn onClick={onClick}>새로운 맛의 자극</AnswerBtn>
            <AnswerBtn onClick={onClick}>스트레스 해소</AnswerBtn>
            <AnswerBtn onClick={onClick}>함께한 사람과의 기억</AnswerBtn>
            <AnswerBtn style={{marginBottom: 0}} onClick={onClick}>편안한 여운</AnswerBtn>
            <span style={{marginTop: 37, color: '#F5CD8A', fontSize: 12, fontWeight: 700}}>4/6</span>
        </ContentContainer>
    )
}

export default Content4;