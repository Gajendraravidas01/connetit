import React, { useContext } from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { AuthContext } from '../../context/authContext';

const Navebar = () => {
  const{currentUser} = useContext(AuthContext);
  
  return (
    <div className='navbar'>
        <span className="logo">You<span style={{color : 'red'}}>&</span>Me</span>
        <div className="user">
            <img src={currentUser.photoURL} alt="" />
            <span>{currentUser.displayName}</span>
            <button className='logoutbtn' onClick={() => signOut(auth)}>Logout</button>
        </div>
    </div>
  );
};

export default Navebar;