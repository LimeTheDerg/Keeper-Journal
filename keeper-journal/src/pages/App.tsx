import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './homepage';
import SignIn from './signin';
import SignUp from './signup';
import { useCookies } from 'react-cookie';
import Dashboard from './dashboard';
import CreateEntryPage from './create';
import Edit from './edit';
import UserSettings from './usersettings';

function App() {

  const [cookies] = useCookies(['user', 'password']);

  if (cookies.password == null && cookies.user == null) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/signin' element={<SignIn/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
        </Routes>
      </BrowserRouter>
    )
  }
  else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='/create' element={<CreateEntryPage/>}></Route>
          <Route path='/edit/:entryId' element={<Edit/>}></Route>
          <Route path='/settings' element={<UserSettings/>}></Route>
        </Routes>
      </BrowserRouter>    
    )
  }
}

export default App