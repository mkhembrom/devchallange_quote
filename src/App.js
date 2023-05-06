import { Container } from "@chakra-ui/react";
import { Home } from "./pages/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Detail } from "./pages/detail";

function App() {

  return (
    <Container h={"full"} minH={"100vh"} w={"full"} maxW={"container.lg"} p={[10, 20]} display={"flex"} alignItems={"flex-start"} justifyContent={"center"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:author" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
