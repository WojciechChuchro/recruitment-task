import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        surname: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
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
            // Password matching check
            if (formData.password !== formData.confirmPassword) {
                throw new Error("Passwords do not match.");
            }

            const response = await axios.post("your-register-api-endpoint", formData);

            if (!response.data.success) {
                throw new Error(`Server error: ${response.data.message}`);
            }

            setResponseMessage(response.data.message);
        } catch (error) {
            setError(error.message || "An error occurred during registration. Please try again.");
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

                    <FormControl id="name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                            type="text"
                            placeholder="Enter your name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl id="surname" isRequired>
                        <FormLabel>Surname</FormLabel>
                        <Input
                            type="text"
                            placeholder="Enter your surname"
                            name="surname"
                            value={formData.surname}
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

                    <FormControl id="confirmPassword" isRequired>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Confirm your password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    {error && <Text color="red.500">{error}</Text>}
                    {responseMessage && <Text color="green.500">{responseMessage}</Text>}

                    <Button type="submit" colorScheme="blue" mt={4} isLoading={loading}>
                        Register
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default Register;
