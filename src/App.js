import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import './style.scss'
import React, { useContext } from 'react';
import { Navigate, Route,Routes } from 'react-router-dom';
import { AuthContext } from './context/authContext';

function App() {
  const{currentUser} = useContext(AuthContext);

  const Protectedroute = ({children}) => {
    if(!currentUser){
      return <Navigate to={"/login"}/>
    }
    return children;
  }
  return (
    <div>
      <Routes>
        <Route path='/' element = {
          <Protectedroute>
            <Home/>
          </Protectedroute>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path='/login' element = {<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
