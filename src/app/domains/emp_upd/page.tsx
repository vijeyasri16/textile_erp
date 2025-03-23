'use client';

import React, { useState, useEffect } from 'react';
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
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const UpdateEmployee: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();  // ✅ FIX: Use useParams instead of useRouter().query

  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!id) return;

    // Simulating fetching employee data
    const employees = [
      { id: 'E001', name: 'John Doe', password: 'password123' },
      { id: 'E002', name: 'Jane Smith', password: 'securepass' },
    ];
    const existingEmployee = employees.find((e) => e.id === id);
    
    if (existingEmployee) {
      setEmployee(existingEmployee);
    }
  }, [id]);

  const handleUpdate = () => {
    alert('Employee updated successfully!');
    router.push('/employee-list'); // ✅ Fix: Correct navigation for App Router
  };

  return (
    <Box maxW="500px" mx="auto" mt={20} p={6} boxShadow="lg" borderRadius="md" bg="white">
      <Heading size="lg" textAlign="center" mb={6}>Update Employee</Heading>

      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Employee ID</FormLabel>
          <Input type="text" value={employee.id} isReadOnly />
        </FormControl>

        <FormControl>
          <FormLabel>Employee Name</FormLabel>
          <Input 
            type="text" 
            value={employee.name} 
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })} 
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={employee.password}
              onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
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

      <Flex mt={6} justify="space-between">
        <Button colorScheme="blue" onClick={handleUpdate}>Update Employee</Button>
        <Link href="/domains/emp_list">
          <Button colorScheme="teal" ml={2}>Cancel</Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default UpdateEmployee;
