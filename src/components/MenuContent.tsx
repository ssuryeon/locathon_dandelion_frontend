import styled from "styled-components";

interface IMenu {
    name: string,
    eng_name: string,
}

interface IContent {
    title: string,
    name: string,
    menus: IMenu[],
    style?: object,
}

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 62px;
    row-gap: 63px;
`;

function MenuItem({name, eng_name}:IMenu) {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{width: 138, height: 172, backgroundColor: '#474848', borderRadius: 10.34, border: '1px solid #DFDFDF'}}>
                <img src={`/${name}.svg`}/>
            </div>
            <span style={{fontSize: 20, fontWeight: 700, color: '#E7D9C9', marginTop: 14}}>{name}</span>
            <span style={{fontSize: 15, fontWeight: 'normal', color: '#E7D9C9', marginTop: 2}}>{eng_name}</span>
        </div>
    )
}

function MenuContent({title, name, menus, style}:IContent) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', marginTop: 30, ...style}}>
            <span style={{fontSize: 26, fontWeight: 700, color: '#E7D9C9', marginBottom: 10}}>{title}</span>
            <span style={{fontSize: 20, fontWeight: "normal", color: '#E7D9C9', marginBottom: 22}}>{name}</span>
            <GridContainer>
                {
                    menus.map((m, idx) => 
                        <MenuItem name={m.name} eng_name={m.eng_name} key={idx}/>
                    )
                }
            </GridContainer>
        </div>
    );
}

export default MenuContent;