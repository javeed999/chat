import React, { useState } from "react";
import { Box, Tooltip, Button, Text, Spinner, Input } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ChatState } from "../Context/ChatProvider";
import { Avatar } from '@chakra-ui/react';
import ProfileModel from "./ProfileModel";
import { useToast } from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react";
import { getSender } from "../config/ChatLogics";
import { useHistory } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SideDrawer = () => {
  const { user, chats, setChats, selectedChat, setSelectedChat, notifications, setNotifications } = ChatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await fetch(`http://localhost:5400/api/chat`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({ userId: userId }),
      });
      const data = await response.json();

      setLoadingChat(false);
      setSelectedChat(data);
      onClose();
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  const handleSearch = async () => {
    if (!search) {
      toast.warning("Please Enter something in search.", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await fetch(`http://localhost:5400/api/user?search=${search}`, config);
      const data = await response.json();
      setLoading(false);
      setSearchResult(data);
    } catch (err) {
      toast.error("Failed to load search results.", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth={"5px"}
      >
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px="4px">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily={"Work Sans"}>
          Talk-A-Tive
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <div style={{ position: "relative" }}>
                <BellIcon fontSize={"2xl"} m={1} />
                {notifications.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "12px",
                      height: "12px",
                      backgroundColor: "red",
                      borderRadius: "50%",
                      color: "white",
                      fontSize: "10px",
                      textAlign: "center",
                      lineHeight: "12px",
                    }}
                  >
                    {notifications.length}
                  </div>
                )}
              </div>
            </MenuButton>
            <MenuList pl={2}>
              {!notifications.length && "No new messages"}
              {notifications.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotifications(notifications.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
            </MenuButton>
            <MenuList>
              <ProfileModel user={user}>
                <MenuItem>Profile</MenuItem>
              </ProfileModel>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>LogOut</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" flexDirection={"row"} justifyContent={"space-around"} pb="2">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email"
                mr={2}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult.map((eachItem) => (
                <UserListItem key={eachItem._id} user={eachItem} handleFunction={() => accessChat(eachItem._id)} />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Toast Container for Toastify notifications */}
      <ToastContainer />
    </>
  );
};

export default SideDrawer;
