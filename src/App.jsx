import axios from 'axios';
import { useContext, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Friends from './components/Friends/Friends';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import Search from './components/Search/Search';
import Timer from './components/Timer/Timer';
import { AppContext } from './context/AppContext';

function App() {
  const { setUser } = useContext(AppContext);
  useEffect(() => {
    const token = document.cookie.replace('token=', '')
    axios.post("socialcubing-production.up.railway.app/auth", { token })
      .then(res => {
        if (res.data.status === "success") {
          console.log(res.data);
          setUser(res.data.payload);
        } else {
          console.log(res.data);
          setUser({});
        }
      })
      .catch(console.log);
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Timer />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/search' element={<Search />} />
          <Route path='/profile/:uid' element={<Profile />} />
          <Route path='/friends/:uid' element={<Friends />} />

          <Route path='/*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
