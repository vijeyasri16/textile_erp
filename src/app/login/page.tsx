'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Heading, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  VStack, 
  InputGroup, 
  InputRightElement, 
  IconButton, 
  Flex 
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const EmployeeLogin: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box 
      maxW="400px" 
      mx="auto" 
      mt={20} 
      p={6} 
      boxShadow="lg" 
      borderRadius="md" 
      bg="white"
    >
      <Heading size="lg" textAlign="center" mb={6}>Employee Login</Heading>
      
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Employee ID</FormLabel>
          <Input 
            type="text" 
            value={id} 
            onChange={(e) => setId(e.target.value)} 
            placeholder="Enter your ID" 
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input 
              type={showPassword ? 'text' : 'password'} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
            />
            <InputRightElement>
              <IconButton 
                aria-label="Toggle password visibility"
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />} 
                size="sm"
                onClick={() => setShowPassword(!showPassword)} 
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </VStack>

      {/* Buttons Section */}
      <Flex mt={6} justify="space-between">
        <Button colorScheme="blue" >Login</Button>
        <Link href="/domains" passHref>
          <Button colorScheme="teal" ml={2}>Exit</Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default EmployeeLogin;
