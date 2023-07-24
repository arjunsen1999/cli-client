import { HiChevronLeft } from "react-icons/hi";
import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Box,
  InputGroup,
  InputRightElement,
  Checkbox,
} from "@chakra-ui/react";
import { SmallCloseIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import notification from "./Toast";

function App() {
  const [email, setEmail] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      const value = email.trim();
      if (!value) {
        notification("error", "email is required");
        return;
      }
      const res = await fetch(`https://nice-ruby-earthworm-slip.cyclic.app/nominee?email=${email}`);
      const resData = await res.json();
      if (resData.status === "fail") {
        notification("error", resData.message);
      } else {
        notification("success", resData.message);
        setData(resData.data);
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      notification("error", "Somthing Went Wrong");
    }
  };
  return (
    <>
      <Box w="100%" minHeight={"100vh"} display="flex" flexDirection={"column"}>
        <Box display={"grid"} gridTemplateColumns={"1fr 1fr"}>
          <Box minH="200px" p="50px 100px">
            <Box minH="100vh">
              <Box mb="20px">
                <Link to="/">
                  <Box display={"flex"} alignItems="center">
                    <Box mr="5px">
                      <HiChevronLeft color="#A0AEC0" fontSize={"18px"} />
                    </Box>
                    <Text color="#A0AEC0">Back to Home</Text>
                  </Box>
                </Link>
              </Box>

              {/* /////////////////// */}
              <Flex minH={"100vh"} align={"flex-start"} justify={"center"}>
                <Stack
                  spacing={4}
                  w={"full"}
                  maxW={"md"}
                  rounded={"xl"}
                  p={6}
                  my={2}
                >
                  <Heading
                    lineHeight={1.1}
                    fontSize={{ base: "2xl", sm: "3xl" }}
                  >
                    Nomination form
                  </Heading>
                  <Text color={"#A0AEC0"} mb="30px">
                    Enter your email and get the Nominee Details!
                  </Text>

                  <form onSubmit={handleSubmit}>
                    <FormControl id="email" isRequired mb={"20px"}>
                      <FormLabel>Email address</FormLabel>
                      <Input
                        placeholder="nominee@example.com"
                        _placeholder={{ color: "gray.500" }}
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </FormControl>

                    <Stack
                      spacing={6}
                      direction={["column", "row"]}
                      mb={"30px"}
                    >
                      <Button
                        bg="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(32,43,209,1) 98%, rgba(72,11,228,1) 100%)"
                        color={"white"}
                        w="full"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Stack>
                  </form>
                  {/* //////////////// */}
                  {data && (
                    <Box borderWidth={"1px"} p={"20px"} borderRadius={"8px"}>
                      <Box>
                        <Text>Email of nominee :- {data?.mail}</Text>
                      </Box>
                      <Box>
                        <Text>Name of nominee :- {data?.name}</Text>
                      </Box>
                      <Box>
                        <Text>Segment of nominee :- {data?.segment}</Text>
                      </Box>
                      <Box>
                        <Text>
                          Category being nominated :- {data?.category}
                        </Text>
                      </Box>
                    </Box>
                  )}
                  {/* //////////////// */}
                </Stack>
              </Flex>
              {/* ////////////////////// */}
            </Box>
          </Box>

          <Box minH="200px">
            <Box
              bg="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(32,43,209,1) 98%, rgba(72,11,228,1) 100%)"
              minH={"100vh"}
              borderRadius={"0px 0px 0px 250px"}
            ></Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
