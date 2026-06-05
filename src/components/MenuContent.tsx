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

function MenuItem({name, eng_name}:IMenu) {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{width: 138, height: 172, backgroundColor: '#474848', borderRadius: 10.34, border: '1px solid #DFDFDF'}}>
                <img src={`/${name}.svg`}/>
            </div>
            <span style={{fontSize: 20, fontWeight: 700, color: '#E7D9C9', marginTop: 14}}>{name}</span>
            <span style={{fontSize: 13, fontWeight: 'normal', color: '#E7D9C9', marginTop: 2}}>{eng_name}</span>
        </div>
    )
}

function MenuContent({title, name, menus, style}:IContent) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', marginTop: 30, ...style}}>
            <span style={{fontSize: 26, fontWeight: 700, color: '#E7D9C9', marginBottom: 10, paddingLeft: 32}}>{title}</span>
            <span style={{fontSize: 20, fontWeight: "normal", color: '#E7D9C9', marginBottom: 22, paddingLeft: 32}}>{name}</span>
            <GridContainer>
                {
                    menus.map((m, idx) =>
                        <GridWrapper isRight={(idx % 2) ? true : false}>
                            <MenuItem name={m.name} eng_name={m.eng_name} key={idx} isRight={(idx % 2) ? true : false}/>
                        </GridWrapper>
                    )
                }
            </GridContainer>
        </div>
    );
}

export default MenuContent;