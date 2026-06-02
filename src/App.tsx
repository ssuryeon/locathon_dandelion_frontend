import { createBrowserRouter, RouterProvider } from 'react-router'
import GlobalStyle from './styles/globalStyle';
import styled from 'styled-components';
import Main from './pages/Main';
import MapQuest from './components/MapQuest/MapQuest';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Main
  },
  {
    path: '/map',
    Component: MapQuest,
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
