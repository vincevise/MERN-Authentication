import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Component/Login'
import Register from './Component/Register'
import Home from './Pages/Home'
import ProtectedRoutes from './Services/ProtectedRoutes'

function App() {

  return (
     <BrowserRouter> 
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<ProtectedRoutes/>}>
          <Route path='/home' element={<Home/>}/>
        </Route>
        
      </Routes>
     </BrowserRouter>
  )
}

export default App
