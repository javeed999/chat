import React from 'react'
import {Box} from "@chakra-ui/react"
import { ChatState } from '../Context/ChatProvider'
import SingleChat from '../../Pages/SingleChat'
const ChatBox = ({fetchAgain,setFetchAgain}) => {

  const {selectedChat}=ChatState()
  return (
    <Box
      d={{base:selectedChat ? "flex" :"none",md:"flex"}}
      alignItems={"center"}
      flexDirection={"column"}
      justifyContent={"center"}
      p={3}
      bg="white"
      w={{base:"100%",md:"68%"}}
      borderRadius="lg"
      borderWidth={"1px"}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </Box>
  )
}

export default ChatBox