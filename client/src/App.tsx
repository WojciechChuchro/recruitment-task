import React, { useEffect, useState } from "react";
import {
  Center,
  ChakraProvider,
  ColorModeScript,
  Container,
  Spinner,
} from "@chakra-ui/react";
import theme from "./theme";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Navigation from "./components/Navigation.tsx";
import Register from "./pages/Register.tsx";
import { validateJwt } from "./validateJwt.ts";
import Tasks from "./components/Tasks.tsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const user = await validateJwt();
        setIsLoading(true);
        setIsLoggedIn(true);
        console.log("Token is valid. User:", user);
      } catch (error) {
        setIsLoggedIn(false);
        console.error("Token validation failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkTokenValidity();
  }, []);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/tasks",
      element: isLoggedIn ? <Tasks />: <Navigate to="/login" />,
    },
  ]);
  return (
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Container maxW="container.sm">
          <ColorModeScript initialColorMode={theme.config.initial} />
          <RouterProvider router={router} />
        </Container>
      </ChakraProvider>
    </React.StrictMode>
  );
};

export default App;
