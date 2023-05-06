import { Box, Button, HStack, Link, Spacer, Text, VStack, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link as reachLink } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";
import { TfiReload } from 'react-icons/tfi';
import { BsSun, BsMoon } from 'react-icons/bs';
import useSWR from 'swr';
import { fetcher } from "../utils/fetcher";
import { BallTriangle } from "react-loader-spinner";
import { useState } from "react";

export const Home = () => {
    const [currentPage, setCurrentPage] = useState(Math.floor(Math.random() * 7268));
    const [randomQuotePerPage, setRandomQuotePerPage] = useState(Math.floor(Math.random() * 10));

    const bg = useColorModeValue("#000", "#F7DF94");
    const { colorMode, toggleColorMode } = useColorMode()
    const { data, isLoading } = useSWR(`https://quote-garden.onrender.com/api/v3/quotes?page=${currentPage}`, fetcher);
    const quote = data?.data[randomQuotePerPage];

    const randomQuote = () => {

        const randomNumber = Math.floor(Math.random() * 10);
        const randomPageNumber = Math.floor(Math.random() * data?.pagination?.totalPages);
        setCurrentPage(randomPageNumber);
        setRandomQuotePerPage(randomNumber)

    }


    if (isLoading) return <Box position={"absolute"} top={"0"} left={"0"} w={"100vw"} h={"100vh"} display={"grid"} placeItems={"center"}>
        <BallTriangle
            height={60}
            width={60}
            radius={5}
            color={bg}
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
        />
    </Box>
    return (
        <VStack w={"full"} h={"400px"} display={"flex"} alignItems={"center"} justifyContent={"flex-start"} my={[20, 20]}>
            <HStack justifyContent={"space-between"} alignItems={"center"} w={"full"}>
                <Button onClick={toggleColorMode} as={motion.div} cursor={"pointer"} fontSize={"sm"} variant='solid' bgColor={"transparent"} _hover={{ bgColor: "transparent" }}>
                    {colorMode === 'light' ? <BsMoon size={40} /> : <BsSun size={40} />}
                </Button>
                <Button onClick={randomQuote} cursor={"pointer"} fontSize={"sm"} variant='solid' bgColor={"transparent"} _hover={{ bgColor: "transparent" }}>random <Spacer w={2} />
                    <Box  >
                        <TfiReload />
                    </Box>
                </Button>
            </HStack>
            <HStack display={"flex"} justifyContent={"center"} alignItems={"center"} h={"full"} minH={"full"}>
                <Box w={"full"} maxW={["full", "600px"]} borderLeft={"4px solid #F7DF94"} px={[4, 20]}>
                    <Text fontSize={["sm", "xl"]} fontWeight={"400"} lineHeight={"26px"}>
                        {quote?.quoteText}
                    </Text>
                </Box>
            </HStack>
            <HStack display={"flex"} justifyContent={"center"} alignItems={"center"} w={"full"}>
                <Box w={"full"} maxW={"600px"} px={[4, 20]} justifyContent={"center"} alignItems={"center"}>
                    <Link as={reachLink} to={`/detail/${quote?.quoteAuthor}/`} bgColor={"transparent"} _hover={{ bgColor: "#323332", color: "#fff" }} cursor={"pointer"} w={"full"} maxW={"600px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} p={5} borderRadius={"0"}>
                        <VStack alignItems={"flex-start"}>
                            <Text fontSize={"md"}>{quote?.quoteAuthor}</Text>
                            <Text fontSize={"sm"} sx={{ marginTop: "0px !important" }}>{quote?.quoteGenre}</Text>
                        </VStack>
                        <Box>
                            <HiArrowLongRight size={20} />
                        </Box>
                    </Link>
                </Box>
            </HStack>

        </VStack>
    );
}