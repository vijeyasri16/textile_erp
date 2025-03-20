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

const EmployeePage: React.FC = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box 
      maxW="500px" 
      mx="auto" 
      mt={20} 
      p={6} 
      boxShadow="lg" 
      borderRadius="md" 
      bg="white"
    >
      <Heading size="lg" textAlign="center" mb={6}>Add Employee</Heading>
      
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Employee ID</FormLabel>
          <Input 
            type="text" 
            value={id} 
            onChange={(e) => setId(e.target.value)} 
            placeholder="Enter Employee ID" 
          />
        </FormControl>

        <FormControl>
          <FormLabel>Employee Name</FormLabel>
          <Input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter Employee Name" 
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input 
              type={showPassword ? 'text' : 'password'} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter Password" 
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
        <Button colorScheme="blue">Create Employee</Button>
        <Link href="/domains" passHref>
          <Button colorScheme="teal" ml={2}>Exit</Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default EmployeePage;
