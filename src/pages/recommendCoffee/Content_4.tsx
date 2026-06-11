import { AnswerBtn } from "../../components/AnswerBtn";
import { ContentContainer } from "../../components/ContentContainer";
import { useNavigate } from "react-router";
import { recommendStore } from '../../stores/RecommendStore';

function Content4() {
    const navigate = useNavigate();
    const setX = recommendStore((state) => state.setScoreX);
    const setY = recommendStore((state) => state.setScoreY);

    const onClick = (x:number, y:number) => {
        setX(x);
        setY(y);
        navigate('/recommend/five');
    };

    return (
        <ContentContainer style={{alignItems: 'center'}}>
            <img src='/question_images/q4_image.svg' width={276} height={276} style={{marginTop: 60}} />
            <span style={{fontSize: 15, fontWeight: 700, color: '#DEDEDE', marginTop: 59, marginBottom: 37}}>Q4. 커피 한 잔을 마신 뒤 가장 중요하게 남는 것은?</span>
            <AnswerBtn onClick={() => onClick(3, 3)}>새로운 맛의 자극</AnswerBtn>
            <AnswerBtn onClick={() => onClick(-3, 0)}>스트레스 해소</AnswerBtn>
            <AnswerBtn onClick={() => onClick(0, 3)}>함께한 사람과의 기억</AnswerBtn>
            <AnswerBtn style={{marginBottom: 0}} onClick={() => onClick(-3, -3)}>편안한 여운</AnswerBtn>
            <span style={{marginTop: 37, color: '#F5CD8A', fontSize: 12, fontWeight: 700}}>4/6</span>
        </ContentContainer>
    )
}

export default Content4;