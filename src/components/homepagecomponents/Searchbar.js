import React, { useContext, useState } from 'react'
import { collection, query, where,getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc} from "firebase/firestore";
import { db } from '../../firebase';
import { AuthContext } from '../../context/authContext';


const Searchbar = () => {
  const[userName,setUserName] = useState("");
  const[user,setUser] = useState(null);
  const[err,setErr] = useState(false);

  const{currentUser} = useContext(AuthContext);

  const handleSearch =async () => {
    
    const q = query(collection(db, "users"), where("displayName", "==", userName));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
    } catch (error) {
      setErr(true);
      console.log(error);
    }
  }
  
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleclick = async () => {
    //creating the combine id for user and the friend who is making conversation with user
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    //check whether the group(chat in firebase) is existed or not. if not then create new.
    try {
      const res = await getDoc(doc(db,"chats",combinedId));

      if(!res.exists()){
        //create a chat in chat collection
        await setDoc(doc(db,"chats",combinedId),{messages : []});

        //crate user chat
        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combinedId+".userInfo"]: {
            uid : user.uid,
            displayName : user.displayName,
            photoURL : user.photoURL,
          },
          [combinedId+".date"] : serverTimestamp()
        })

        //for other user
        await updateDoc(doc(db,"userChats",user.uid),{
          [combinedId+".userInfo"]: {
            uid : currentUser.uid,
            displayName : currentUser.displayName,
            photoURL : currentUser.photoURL,
          },
          [combinedId+".date"] : serverTimestamp()
        })
      }
    } catch (error) {
      console.log(error);
      setErr(true);
    }
    setUser(null);
    setUserName("");
  }
  return (
    <div className='searchbar'>
        <div className="searchform">
            <input 
              type="text" 
              name="search" 
              id="search" 
              placeholder='search a user' 
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={handleKey}
              value={userName}
            />
        </div>
        {err && <span>Something went wrong!</span>}
        {user && <div className="userchat" onClick={handleclick}>
            <img src={user.photoURL} alt="" />
            <div className="username">
                <span>{user.displayName}</span>
            </div>
        </div>}
    </div>
  )
}

export default Searchbar