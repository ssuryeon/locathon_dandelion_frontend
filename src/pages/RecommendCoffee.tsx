import { Outlet } from 'react-router';
import Header from '../components/Header';

function RecommendCoffee() {
    return (
        <div style={{width: '100%', height: '100%', backgroundImage: 'url(/background.svg)', display: 'flex', flexDirection: 'column', position: 'relative'}}>
            <Header />
            <Outlet />
        </div>
    );
}

export default RecommendCoffee;