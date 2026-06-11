import { ContentContainer } from '../../components/ContentContainer';
import { useNavigate } from 'react-router';
import { SelectBtn } from '../../components/SelectBtn';

function Content0() {
    const navigate = useNavigate();

    return(
        <ContentContainer style={{justifyContent: 'center'}}>
            <div style={{width: '100%', height: '100%', marginTop: 66, textAlign: 'center'}}>
                <span style={{color: '#DEDEDE', fontSize: 20, fontWeight: 700}}>나와 어울리는 커피 찾기</span>
                <div style={{backgroundImage: 'url(/question_images/q0_background.svg)', marginTop: 33, marginBottom: 33, width: '100%'}}>
                    <img src='/question_images/q0_image.svg' />
                </div>
                <span style={{color: '#DEDEDE', fontSize: 13, fontWeight: 400}} >로스터리 장인이 당신과 어울리는 커피를 권하고자 합니다.</span>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 33}}>
                    <SelectBtn style={{marginBottom: 31, color: '#F5CD8A'}} onClick={() => navigate('/recommend/one')}>추천해주세요</SelectBtn>
                    <SelectBtn style={{color: '#FFFDEC'}} onClick={() => navigate('/')}>돌아가기</SelectBtn>
                </div>
            </div>
        </ContentContainer>
    );
}

export default Content0;