import { AnswerBtn } from "../../components/AnswerBtn";
import { ContentContainer } from "../../components/ContentContainer";
import { useNavigate } from "react-router";
import { recommendStore } from '../../stores/RecommendStore';

function Content2() {
    const navigate = useNavigate();
    const setX = recommendStore((state) => state.setScoreX);
    const setY = recommendStore((state) => state.setScoreY);

    const onClick = (x:number, y:number) => {
        setX(x);
        setY(y);
        navigate('/recommend/three');
    };

    return (
        <ContentContainer style={{alignItems: 'center'}}>
            <img src='/question_images/q2_image.svg' width={274} height={274} style={{marginTop: 65}} />
            <span style={{fontSize: 15, fontWeight: 700, color: '#DEDEDE', marginTop: 56, marginBottom: 37}}>Q2. 커피를 내리는 향이 퍼질 때 먼저 드는 생각은?</span>
            <AnswerBtn onClick={() => onClick(3, 0)}>어떤 맛일지 궁금하다</AnswerBtn>
            <AnswerBtn onClick={() => onClick(-3 ,0)}>익숙한 향이라 편안하다</AnswerBtn>
            <AnswerBtn onClick={() => onClick(0, 3)}>누군가와 함께 마시고 싶다</AnswerBtn>
            <AnswerBtn style={{marginBottom: 0}} onClick={() => onClick(0, -3)}>잠시 멈춰 쉬고 싶다</AnswerBtn>
            <span style={{marginTop: 37, color: '#F5CD8A', fontSize: 12, fontWeight: 700, marginBottom: 38}}>2/6</span>
        </ContentContainer>
    )
}

export default Content2;