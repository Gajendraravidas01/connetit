import React, { useContext, useState } from 'react'
import gllyimg from '../images/gallery-icon.png'
import fileicn from '../images/attachedfile-icon.png'
import { AuthContext } from '../../context/authContext';
import { ChatContext } from '../../context/ChatsContexts';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import {v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
  const[text,setText] = useState("");
  const[img,setImg] = useState(null);

  const{currentUser} = useContext(AuthContext);
  const{data} = useContext(ChatContext);

  const handlesend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img : downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    };

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className='input'>
        <input type="text" placeholder='type something...' onChange={(e) => setText(e.target.value)} value={text}/>
        
        <div className="inputicon">
          <input type="file" style={{display : 'none'}} id='file' onChange={(e)=> setImg(e.target.files[0])}/>

          <img src={fileicn} alt="" />
          <label htmlFor="file">
            <img src={gllyimg} alt="" />
          </label>
          <button className='sendbtn' onClick={handlesend}>send</button>
        </div>
      
    </div>
  );
};

export default Input;