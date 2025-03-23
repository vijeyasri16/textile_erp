'use client';

import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const CreateEmployee: React.FC = () => {
  const router = useRouter();
  const toast = useToast();

  const [employee, setEmployee] = useState({ id: '', name: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:6660/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
      });
      toast({ title: 'Employee added!', status: 'success', duration: 3000, isClosable: true });
      router.push('/domains/employees');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box maxW="500px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Add Employee</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel>Employee ID:</FormLabel>
          <Input name="id" value={employee.id} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Name:</FormLabel>
          <Input name="name" value={employee.name} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Password:</FormLabel>
          <Input name="password" type="password" value={employee.password} onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="blue">Save</Button>
      </form>
    </Box>
  );
};

export default CreateEmployee;
