import React, { useState } from "react";
import { VStack, InputRightElement, InputGroup, Button } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const toast = useToast();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill All Fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      };
      const response = await fetch("http://localhost:5400/api/user/login", options);
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Login Successful.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        history.replace("/chats");
      } else {
        setLoading(false);
        toast({
          title: "Invalid Email Or Password.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast({
        title: "Something went wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={"20px"} color="black" bg="gray.100" p={6} borderRadius="lg">
      <FormControl id="email" isRequired>
        <FormLabel fontSize="lg" fontWeight="bold" color="blue.600">
          Email
        </FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          bg="white"
          borderColor="blue.300"
          focusBorderColor="blue.400"
          _hover={{ borderColor: "blue.500" }}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel fontSize="lg" fontWeight="bold" color="blue.600">
          Password
        </FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            value={password}
            placeholder="Enter Your Password"
            onChange={(event) => setPassword(event.target.value)}
            bg="white"
            borderColor="blue.300"
            focusBorderColor="blue.400"
            _hover={{ borderColor: "blue.500" }}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              colorScheme="blue"
              variant="outline"
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
        borderRadius="md"
        _hover={{ bg: "blue.600" }}
      >
        Login
      </Button>

      <Button
        width="100%"
        colorScheme="red"
        variant="solid"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
        borderRadius="md"
        _hover={{ bg: "red.600" }}
      >
        Get User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
