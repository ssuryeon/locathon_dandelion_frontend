import { createBrowserRouter, RouterProvider } from 'react-router'
import GlobalStyle from './styles/globalStyle';
import Main from './pages/Main';
import MapQuest from './components/MapQuest/MapQuest'

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

export default function App() {
  return (
    <>
      <GlobalStyle />
      <div style={{width: '100vw', height: '100vh', margin: 0, padding: 0}}>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  )
}
