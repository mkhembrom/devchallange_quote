import { Box, Button, Flex, HStack, Spacer, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { Link as reachLink, useParams } from 'react-router-dom';
import { HiArrowLongLeft } from "react-icons/hi2";
import useSWR from 'swr';
import { fetcher } from "../utils/fetcher";
import { BallTriangle } from "react-loader-spinner";


export const Detail = () => {

    const bg = useColorModeValue("#000", "#F7DF94");
    const { author } = useParams();
    const { data, isLoading } = useSWR(`https://quote-garden.onrender.com/api/v3/quotes/?author=${author}`, fetcher);
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
        <VStack w={"full"} h={"full"} minH={"400px"} display={"flex"} alignItems={"center"} justifyContent={"flex-start"} my={[20, 20]}>

            <HStack justifyContent={"flex-end"} alignItems={"center"} w={"full"}>
                <Button as={reachLink} to="/" display={"flex"} alignItems={"center"} cursor={"pointer"} variant='solid' bgColor={"transparent"} _hover={{ bgColor: "transparent" }} fontSize={"md"}>
                    <Box  >
                        <HiArrowLongLeft size={20} />
                    </Box>
                    <Spacer width={1} />
                    back
                </Button>
            </HStack>

            <HStack >
                <VStack display={"flex"} justifyContent={"flex-start"} alignItems={"center"} h={"full"} >
                    <Flex flexDirection={"column"} h={"full"} w={"full"}>
                        <HStack mb={10} justifyContent={"flex-start"} alignItems={"flex-start"} w={"full"}>
                            <Text fontSize={"2xl"}>{author}</Text>
                        </HStack>

                        {
                            data?.data.map((item, index) => (
                                <Box key={index} w={"full"} maxW={["full", "600px"]} borderLeft={"4px solid #F7DF94"} px={[4, 20]} mb={10}>
                                    <Text fontSize={["sm", "xl"]} fontWeight={"400"} lineHeight={"26px"}>
                                        {item.quoteText}
                                    </Text>
                                </Box>
                            ))
                        }

                    </Flex>


                </VStack>
            </HStack>

        </VStack >
    );
}