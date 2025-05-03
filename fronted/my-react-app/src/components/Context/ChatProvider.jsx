// import {createContext,useState,useEffect,useContext} from "react"
// import {useHistory} from "react-router-dom"
// const ChatContext=createContext()

// const ChatProvider=({children})=>{
//     const [user,setUser]=useState();
//     const[selectedChat,setSelectedChat]=useState();
//     const[chats,setChats]=useState([])
//     const history=useHistory()
   
//     return <ChatContext.Provider value={{user,setUser,selectedChat,setSelectedChat,chats,setChats}}>
//         {children}
//     </ChatContext.Provider>
    

// }

// export const ChatState=()=>{
//     return useContext(ChatContext)
// }
// export default ChatProvider
import { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const history = useHistory();
  const[notifications,setNotifications]=useState([])

  // Effect for user info
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      history.push("/");  // Redirect to login or home if no user info
    } else {
      setUser(userInfo);
    }
  }, [history]);  // Only depend on `history`

  // Provide the state to the children of this provider
  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats,notifications,setNotifications}}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
