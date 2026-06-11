import { ContentContainer } from "../../components/ContentContainer";
import { useNavigate } from "react-router";
import { SelectBtn } from "../../components/SelectBtn";


function RecommendResult() {
    const navigate = useNavigate();

    return (
        <ContentContainer style={{alignItems: 'center'}}>
            <span style={{marginTop: 43, color: '#DEDEDE', fontSize: 20, fontWeight: 700, textAlign: 'center', marginBottom: 33}}>축하합니다!<br />당신과 어울리는 커피가 완성되었습니다.</span>
            <div style={{backgroundImage: 'url(/question_images/q0_background.svg)', width: '100%'}}>
                <img src='/question_images/recommend_result_image.svg' />
            </div>
            <div style={{width: 'calc(100% - 54px)', height: 222, backgroundColor: '#363636', borderRadius: 20, color: '#DEDEDE', marginTop: -87}}></div>
            <SelectBtn style={{color: '#F5CD8A', marginTop: 51}} onClick={() => navigate('/')}>돌아가기</SelectBtn>
        </ContentContainer>
    );
}

export default RecommendResult;