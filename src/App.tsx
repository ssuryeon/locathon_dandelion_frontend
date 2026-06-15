import { createBrowserRouter, RouterProvider } from 'react-router'
import GlobalStyle from './styles/globalStyle';
import styled from 'styled-components';
import Main from './pages/Main';
import MapQuest from './components/MapQuest/MapQuest';
import Menu from './pages/Menu';
import MenuDetail from './pages/MenuDetail';
import RecommendCoffee from './pages/RecommendCoffee';
import Content0 from './pages/recommendCoffee/Content_0';
import Content1 from './pages/recommendCoffee/Content_1';
import Content2 from './pages/recommendCoffee/Content_2';
import Content3 from './pages/recommendCoffee/Content_3';
import Content4 from './pages/recommendCoffee/Content_4';
import Content5 from './pages/recommendCoffee/Content_5';
import Content6 from './pages/recommendCoffee/Content_6';
import RecommendResult from './pages/recommendCoffee/RecommendResult';
import MapPage from './pages/MapPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Main,
  },
  {
    path: '/map',
    Component: MapPage,
  },
  {
    path: '/maptest',
    Component: MapQuest,
  },
  {
    path: '/menu',
    Component: Menu,
  },
  {
    path: '/menu/:name',
    Component: MenuDetail,
  },
  {
    path: '/recommend',
    Component: RecommendCoffee,
    children: [
      {
        index: true,
        Component: Content0,
      },
      {
        path: 'one',
        Component: Content1,
      },
      {
        path: 'two',
        Component: Content2,
      },
      {
        path: 'three',
        Component: Content3,
      },
      {
        path: 'four',
        Component: Content4,
      },
      {
        path: 'five',
        Component: Content5,
      },
      {
        path: 'six',
        Component: Content6,
      },
      {
        path: 'result',
        Component: RecommendResult,
      }
    ]
  }
])

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
        display: none;
  }
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <RouterProvider router={router}></RouterProvider>
      </Container>
    </>
  )
}
