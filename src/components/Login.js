import React,{useState} from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {
  const [error,setError] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className='fromcontainer'>
        <div className="formwrapper">
            <span className='logo'>You<span style={{color:'red',fontSize: '500'}}>&</span>Me</span>
            <span className='title'>Login</span>
            <form action="" onSubmit={handleSubmit}>
                <input type="email"  id="email" placeholder='email' required/>
                <input type="password" id='password' placeholder='password' required/>
                <button className='btn'>Log in</button>
                {error && <span>Something went wrong!</span>}
            </form>
            <p>you don't  have account?<Link to={"/register"}>Register</Link></p>
        </div>
    </div>
  )
}

export default Login;