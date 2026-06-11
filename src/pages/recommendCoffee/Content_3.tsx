import { AnswerBtn } from "../../components/AnswerBtn";
import { ContentContainer } from "../../components/ContentContainer";
import { useNavigate } from "react-router";
import { recommendStore } from '../../stores/RecommendStore';

function Content3() {
    const navigate = useNavigate();
    const setX = recommendStore((state) => state.setScoreX);
    const setY = recommendStore((state) => state.setScoreY);

    const onClick = (x:number, y:number) => {
        setX(x);
        setY(y);
        navigate('/recommend/four');
    };

    return (
        <ContentContainer style={{alignItems: 'center'}}>
            <img src='/question_images/q3_image.svg' width={280} height={280} style={{marginTop: 58}} />
            <span style={{fontSize: 15, fontWeight: 700, color: '#DEDEDE', marginTop: 57, marginBottom: 37}}>Q3. 새로운 원두가 들어왔다.</span>
            <AnswerBtn onClick={() => onClick(3, 3)}>고민 없이 먼저 마셔본다</AnswerBtn>
            <AnswerBtn onClick={() => onClick(-3, 0)}>늘 마시던 메뉴를 선택한다</AnswerBtn>
            <AnswerBtn onClick={() => onClick(0, 3)}>친구에게도 추천한다</AnswerBtn>
            <AnswerBtn style={{marginBottom: 0}} onClick={() => onClick(-3, -3)}>나중에 혼자 천천히 마셔본다</AnswerBtn>
            <span style={{marginTop: 37, color: '#F5CD8A', fontSize: 12, fontWeight: 700}}>3/6</span>
        </ContentContainer>
    )
}

export default Content3;