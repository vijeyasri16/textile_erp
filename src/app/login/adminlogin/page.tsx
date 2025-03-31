'use client';
import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, useToast, Alert, AlertIcon } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const AdminLogin: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Admin credentials - in a real application, these should not be hardcoded
  // but stored securely on the server side
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'admin123';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError(''); // Clear any previous errors when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Local validation instead of API call since we have only one admin
      if (loginData.username === ADMIN_USERNAME && loginData.password === ADMIN_PASSWORD) {
        // Store login information in sessionStorage
        sessionStorage.setItem('adminUsername', ADMIN_USERNAME);
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        
        toast({
          title: 'Admin Login Successful!',
          description: 'Welcome to the Admin Dashboard',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        
        // Redirect to the admin dashboard
        router.push('/home');
      } else {
        setError('Invalid admin credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={12} p={6} boxShadow="lg" borderRadius="md" bg="white">
      <Heading mb={6} textAlign="center">Admin Login</Heading>
      {error && (
        <Alert status="error" mb={4} borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel>Username:</FormLabel>
          <Input 
            name="username" 
            value={loginData.username} 
            onChange={handleChange} 
            placeholder="Enter admin username"
          />
        </FormControl>
        <FormControl isRequired mb={6}>
          <FormLabel>Password:</FormLabel>
          <Input 
            name="password" 
            type="password" 
            value={loginData.password} 
            onChange={handleChange} 
            placeholder="Enter admin password"
          />
        </FormControl>
        <Button 
          type="submit" 
          colorScheme="purple" 
          width="full" 
          isLoading={isLoading}
          loadingText="Logging in"
        >
          Admin Login
        </Button>
      </form>
    </Box>
  );
};

export default AdminLogin;