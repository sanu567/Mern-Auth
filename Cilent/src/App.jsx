import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Page/Home'
import Login from './Page/Login'
import Emailver from './Page/Emailver'
import ResetPassword from './Page/ResetPassword'
 import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div>
      <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>}/>
       <Route path='/login' element={<Login/>}/>
        <Route path='/email-verify' element={<Emailver/>}/>
         <Route path='/reset-password' element={<ResetPassword/>}/>
    </Routes>
    </div>

  )
}

export default App
