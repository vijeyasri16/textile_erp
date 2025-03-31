'use client';
import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, useToast, Alert, AlertIcon } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const EmployeeLogin: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [loginData, setLoginData] = useState({ id: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError(''); // Clear any previous errors when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // First, fetch the employee data to verify credentials
      const response = await fetch(`http://localhost:6660/employees/${loginData.id}`);
      
      if (!response.ok) {
        throw new Error('Invalid employee ID');
      }

      const employee = await response.json();
      
      // Check if password matches
      if (employee.password === loginData.password) {
        // Store login information in localStorage or sessionStorage
        sessionStorage.setItem('employeeId', employee.id);
        sessionStorage.setItem('employeeName', employee.name);
        sessionStorage.setItem('isLoggedIn', 'true');
        
        toast({
          title: 'Login successful!',
          description: `Welcome, ${employee.name}!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        
        // Redirect to the employee dashboard or list page
        router.push('/ehome');
      } else {
        setError('Invalid password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={12} p={6} boxShadow="lg" borderRadius="md" bg="white">
      <Heading mb={6} textAlign="center">Employee Login</Heading>
      
      {error && (
        <Alert status="error" mb={4} borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      )}
      
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel>Employee ID:</FormLabel>
          <Input 
            name="id" 
            value={loginData.id} 
            onChange={handleChange} 
            placeholder="Enter your employee ID"
          />
        </FormControl>
        
        <FormControl isRequired mb={6}>
          <FormLabel>Password:</FormLabel>
          <Input 
            name="password" 
            type="password" 
            value={loginData.password} 
            onChange={handleChange} 
            placeholder="Enter your password"
          />
        </FormControl>
        
        <Button 
          type="submit" 
          colorScheme="blue" 
          width="full" 
          isLoading={isLoading}
          loadingText="Logging in"
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default EmployeeLogin;