import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../ApiConfig.ts";

interface Error {
  message: string;
}

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResponseMessage(null);

    try {
      const response = await axios.post(`${API_BASE_URL}auth/login`, formData, {
        withCredentials: true,
      });

      setResponseMessage(response.data.message);

    } catch (error) {
      console.log(error);
      setError(
        error.response.data.message ||
          "An error occurred during login. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </FormControl>

          {error && <Text color="red.500">{error}</Text>}
          {responseMessage && <Text color="green.500">{responseMessage}</Text>}

          <Button type="submit" colorScheme="blue" mt={4} isLoading={loading}>
            Log In
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
