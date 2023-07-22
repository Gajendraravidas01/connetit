import React, { useState } from 'react'
import add from './images/avatarlogo.png';
import {createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth,db,storage} from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate,Link } from 'react-router-dom';

const Register = () => {
  const[loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setLoading(false);
            setError(true);
          }
        });
      });
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };


  return (
    <div className="fromcontainer">
        <div className="formwrapper">
                <span className='logo'>You<span style={{color:'red',fontSize: '500'}}>&</span>Me</span>
                <span className='title'>Register</span>
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" name="name" id="name" placeholder='Your Name' />
                    <input type="email"  id="email" placeholder='email' />
                    <input type="password" id='password' placeholder='password' />
                    <label htmlFor="file">
                        <img src={add} alt="" />
                        <span>add an avatar</span>
                    </label>
                    <input type="file" id='file' style={{display : 'none'}}/>
                    <button disabled = {loading} className='btn'>Sign up</button>
                    {loading && "Uploading and compressing the image please wait..."}
                    {error && <span>Something went wrong!</span>}
                </form>
                <p>do you have account?<Link to={"/login"}>Login</Link></p>
        </div>
    </div>
  );
};

export default Register;