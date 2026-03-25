import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider
  } from 'react-router-dom'

//style 
import './index.css'

//layout
import RootLayout from './Layout/RootLayout'

//pages
import Home from './Pages/Home'
import ArticlePage from './Pages/ArticlePage'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      <Route path='articles/:slug' element={<ArticlePage/>}/>
    </Route>
  )
) 

function App() {
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App
