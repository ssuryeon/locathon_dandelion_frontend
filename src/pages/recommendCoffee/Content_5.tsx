import { AnswerBtn } from "../../components/AnswerBtn";
import { ContentContainer } from "../../components/ContentContainer";
import { useNavigate } from "react-router";
import { recommendStore } from '../../stores/RecommendStore';

function Content5() {
    const navigate = useNavigate();
    const setX = recommendStore((state) => state.setScoreX);
    const setY = recommendStore((state) => state.setScoreY);

    const onClick = (x:number, y:number) => {
        setX(x);
        setY(y);
        navigate('/recommend/six');
    };

    return (
        <ContentContainer style={{alignItems: 'center'}}>
            <img src='/question_images/q5_image.svg' width={347} height={231} style={{marginTop: 104}} />
            <span style={{fontSize: 15, fontWeight: 700, color: '#DEDEDE', marginTop: 34, marginBottom: 34}}>Q5. 불이 천천히 타오르고 있다.<br />그 모습을 보고 있다면 당신은?</span>
            <AnswerBtn onClick={() => onClick(3, 3)}>새로운 아이디어를 떠올린다</AnswerBtn>
            <AnswerBtn onClick={() => onClick(-3, 0)}>해야 할 일을 차분히 정리한다</AnswerBtn>
            <AnswerBtn onClick={() => onClick(0, 3)}>옆 사람과 이야기를 이어간다</AnswerBtn>
            <AnswerBtn style={{marginBottom: 0}} onClick={() => onClick(-3, -3)}>잠시 아무 생각 없이 쉬어간다</AnswerBtn>
            <span style={{marginTop: 37, color: '#F5CD8A', fontSize: 12, fontWeight: 700, marginBottom: 38}}>5/6</span>
        </ContentContainer>
    )
}

export default Content5;