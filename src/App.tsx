import { createBrowserRouter, RouterProvider } from 'react-router'
import GlobalStyle from './styles/globalStyle';
import styled from 'styled-components';
import Main from './pages/Main';
import MapQuest from './components/MapQuest/MapQuest';
import Menu from './pages/Menu';
import RecommendCoffee from './pages/RecommendCoffee';
import Content0 from './pages/recommendCoffee/Content_0';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Main,
  },
  {
    path: '/map',
    Component: MapQuest,
  },
  {
    path: '/menu',
    Component: Menu,
  }, 
  {
    path: '/recommend',
    Component: RecommendCoffee,
    children: [
      {
        index: true,
        Component: Content0,
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
