import Home from './page/Home'
import Auth from './page/Auth'
import Dashboard from './page/Dashboard'
import Project from './page/Project'
import './App.css'
import Footer from './component/Footer'
import { Route, Routes } from 'react-router-dom'

function App() {
 

  return (
    <>

<Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth insideRegister={true}/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/project' element={<Project/>} />

     </Routes>
    <Footer/>
    </>
  )
}

export default App
