import { VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Signup = () => {
    const [name, setName] = useState();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const postDetails = (pics) => {
        setPicLoading(true);
        if(pics === undefined){
            toast({
                title: 'Please Select an image!',
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
            return;
        }
        if(pics.type === "image/jpeg" || pics.type === "image/png"){
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "Lets-talk-chat-app");
            data.append("cloud_name", "dtod3j7qj");
            fetch("https://api.cloudinary.com/v1_1/dtod3j7qj/image/upload",{
                method: "post",
                body: data,
            }).then((res) => res.json())
            .then((data) => {
                setPic(data.url.toString());
                console.log(data.url.toString());
                setPicLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setPicLoading(false);
            });
        }
        else {
            toast({
              title: "Please Select an Image!",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            setPicLoading(false);
            return;
        }
    };

    const submitHandler = async () =>{
        setPicLoading(true);
        if (!name || !email || !password || !confirmpassword) {
        toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setPicLoading(false);
        return;
        }
        if (password !== confirmpassword) {
        toast({
            title: "Passwords Do Not Match",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        return;
        }
        // console.log(name, email, password, pic);
        try {
        const config = {
            headers: {
            "Content-type": "application/json",
            },
        };
        const { data } = await axios.post(
            "/api/user",
            {
            name,
            email,
            password,
            pic,
            },
            config
        );
        console.log(data);
        toast({
            title: "Registration Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setPicLoading(false);
        navigate("/chats");
        } catch (error) {
        toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setPicLoading(false);
        }
    };

    return (
        <VStack spacing="5px">
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>  
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show?"text":"password"}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement>
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show?"text":"password"}
                        placeholder="Enter Password"
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <InputRightElement>
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="pic">
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                    type="file"
                    p={1.5}
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                type="submit"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={picLoading}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup
