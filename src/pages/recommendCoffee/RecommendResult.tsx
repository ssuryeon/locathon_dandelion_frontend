import { ContentContainer } from "../../components/ContentContainer";
import { useNavigate } from "react-router";
import { SelectBtn } from "../../components/SelectBtn";
import { recommendStore } from '../../stores/RecommendStore';
import { getNearMenu } from "../../lib/getNearMenu";
import { useEffect } from "react";

function RecommendResult() {
    const navigate = useNavigate();
    const scoreX = recommendStore((state) => state.score_x);
    const scoreY = recommendStore((state) => state.score_y);
    const menu = getNearMenu(scoreX, scoreY);
    useEffect(() => {
        console.log(scoreX, scoreY);
    }, [])

    return (
        <ContentContainer style={{alignItems: 'center'}}>
            <span style={{marginTop: 43, color: '#DEDEDE', fontSize: 20, fontWeight: 700, textAlign: 'center', marginBottom: 33}}>축하합니다!<br />당신과 어울리는 커피가 완성되었습니다.</span>
            <div style={{backgroundImage: 'url(/question_images/q0_background.svg)', width: '100%', height: 354, position: 'relative'}}>
                <img src='/question_images/recommend_result_image.svg' />
                <img src={`/menu/${menu?.name}.svg`} height={268} style={{position: 'absolute', bottom: 84, left: '50%', transform: 'translateX(-50%)'}}/>
            </div>
            <div style={{width: 'calc(100% - 54px)', height: 222, backgroundColor: '#363636', borderRadius: 20, color: '#DEDEDE', marginTop: -87, zIndex: 2, textAlign: 'center', padding: '25px 16px', boxSizing: 'border-box'}}>
                <span style={{color: '#DEDEDE', fontSize: 20, fontWeight: 700}}>{menu?.name}</span>
                <p style={{color: '#DEDEDE', fontSize: 13, fontWeight: 400, marginTop: 21}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos est laborum sint molestias qui eaque ad omnis provident temporibus quia!</p>
            </div>
            <SelectBtn style={{color: '#F5CD8A', marginTop: 51}} onClick={() => navigate('/')}>돌아가기</SelectBtn>
        </ContentContainer>
    );
}

export default RecommendResult;