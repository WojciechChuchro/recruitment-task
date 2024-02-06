import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex,} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch.tsx";
import axios from "axios";
import {API_BASE_URL} from "../ApiConfig.ts";
import {useState} from "react";

// @ts-ignore
const Navigation = ({ isLoggedIn, setIsLoggedIn }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleLogout = async () => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResponseMessage(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/auth/logout`, {
        withCredentials: true,
      });

      setResponseMessage(response.data.message);

      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data.message ||
          "An error occurred during logout. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex align="center" m="30" p="4" justify="space-between">
      <Breadcrumb fontWeight="medium" fontSize="lg">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {isLoggedIn ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="/tasks">Tasks</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={handleLogout}>Logout</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ) : (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="/login">Login</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/register">Register</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </Breadcrumb>
      <ColorModeSwitch />
    </Flex>
  );
};

export default Navigation;
