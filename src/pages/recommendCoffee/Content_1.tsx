import { ContentContainer } from '../../components/ContentContainer';
import { AnswerBtn } from '../../components/AnswerBtn';
import { useNavigate } from 'react-router';

function Content1() {
    const navigate = useNavigate();
    const onClick = () => navigate('/recommend/two');

    return (
        <ContentContainer style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src='/question_images/q1_image.svg' width={281} height={281} style={{marginTop: 61}}/>
            <span style={{fontSize: 15, fontWeight: 700, color: '#DEDEDE', marginTop: 53, marginBottom: 37}}>Q1. 당신에게 커피가 가장 필요한 순간은?</span>
            <AnswerBtn onClick={onClick}>새로운 일을 시작할 때</AnswerBtn>
            <AnswerBtn onClick={onClick}>하던 일을 꾸준히 이어갈 때</AnswerBtn>
            <AnswerBtn onClick={onClick}>누군가와 시간을 보내고 싶을 때</AnswerBtn>
            <AnswerBtn style={{marginBottom: 0}} onClick={onClick}>혼자만의 시간을 갖고 싶을 때</AnswerBtn>
            <span style={{marginTop: 37, color: '#F5CD8A', fontSize: 12, fontWeight: 700}}>1/6</span>
        </ContentContainer>
    );
}

export default Content1;