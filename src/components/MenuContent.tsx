import styled from "styled-components";

interface IWrapper {
    isRight: boolean,
}
interface IMenu {
    name: string,
    eng_name: string,
    isRight?: boolean,
}

interface IContent {
    title: string,
    name: string,
    menus: IMenu[],
    style?: object,
}

const GridContainer = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 63px;
    box-sizing: border-box;
`;

const GridWrapper = styled.div<IWrapper>`
    width: 100%;
    height: 100%;
    display: flex;
    padding-left: ${props => props.isRight ? 0 : '32px'};
    padding-right: ${props => props.isRight ? '32px' : 0};
    justify-content: ${props => props.isRight ? 'flex-end' : 'flex-start'};
    box-sizing: border-box;
    background-image: url(/menuItemBackground.svg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: ${props => props.isRight ? 'right' : 'left'};
`;

const RowContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const Row = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    background-image: url(/menuItemBackground.svg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center -30px;
    box-sizing: border-box;
    align-items: center;
    margin-bottom: 63px;
    &:nth-last-of-type() {
        margin-bottom: 0;
    }
`;

function MenuItem({name, eng_name, isRight}:IMenu) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: isRight? 0 : 32, marginRight: isRight? 32 : 0, justifySelf: isRight? 'end' : 'start'}}>
            <div style={{width: 138, height: 172, backgroundColor: '#474848', borderRadius: 10.34, border: '1px solid #DFDFDF'}}>
                <img src={`/menu/${name}.svg`}/>
            </div>
            <span style={{fontSize: 20, fontWeight: 700, color: '#E7D9C9', marginTop: 14}}>{name}</span>
            <span style={{fontSize: 13, fontWeight: 'normal', color: '#E7D9C9', marginTop: 2}}>{eng_name}</span>
        </div>
    )
}

function MenuContent({title, name, menus, style}:IContent) {
    const rows: IMenu[][] = [];
    for (let i = 0; i < Math.ceil(menus.length / 2); i++) {
        rows.push(menus.slice(i * 2, i * 2 + 2));
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', marginTop: 30, ...style}}>
            <span style={{fontSize: 26, fontWeight: 700, color: '#E7D9C9', marginBottom: 10, paddingLeft: 32}}>{title}</span>
            <span style={{fontSize: 20, fontWeight: "normal", color: '#E7D9C9', marginBottom: 22, paddingLeft: 32}}>{name}</span>
            <RowContainer>
                {rows.map((pair, rowIdx) => (
                    <Row key={rowIdx}>
                        {pair.map((m, idx) => (
                            <MenuItem key={rowIdx * 2 + idx} name={m.name} eng_name={m.eng_name} isRight={!!(idx % 2)} />
                        ))}
                        {pair.length === 1 && <div />}
                    </Row>
                ))}
            </RowContainer>
        </div>
    );
}

export default MenuContent;